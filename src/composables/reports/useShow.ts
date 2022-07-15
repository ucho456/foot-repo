/** check */
import { onBeforeUnmount, ref, useRoute, useRouter } from '@nuxtjs/composition-api'
import type { Unsubscribe } from 'firebase/firestore'
import { fetchMatch } from '@/db/matches'
import {
  doLike,
  fetchReport,
  fetchReportItems,
  fetchSameMatchReports,
  postComment,
  subscribeComments
} from '@/db/reports'
import { doFollow, fetchIsFollow, fetchIsLike, fetchUser } from '@/db/users'
import useLoginUser from '@/utils/useLoginUser'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'

const useShow = () => {
  const route = useRoute()
  const router = useRouter()
  const { loginUser } = useLoginUser()
  const { openSnackbar } = useSnackbar()
  const { confirmation } = useStore()

  const report = ref<Report | null>(null)
  const homeTeamReportItems = ref<ReportItem[]>([])
  const awayTeamReportItems = ref<ReportItem[]>([])
  const match = ref<Match | null>(null)
  const user = ref<User | null>(null)
  const sameMatchReports = ref<Report[]>([])
  const comments = ref<ReportComment[]>([])
  const unsubscribeComments = ref<Unsubscribe | null>(null)
  const like = ref(false)
  const follow = ref(false)

  /** setUp */
  const isLoadingReport = ref(false)
  const isLoadingUser = ref(false)
  const isLoadingSameMatchReports = ref(false)
  const isLoadingComments = ref(false)
  const setUp = async (): Promise<void> => {
    try {
      isLoadingReport.value = true
      const reportId = route.value.params.id as string
      const resReport = await fetchReport(reportId)
      if (resReport) {
        const uid = loginUser.value?.uid
        if (!resReport.publish && resReport.user.id !== uid) throw new Error('unauthorized access')
        const { resHomeTeamReportItems, resAwayTeamReportItems } = await fetchReportItems(resReport)
        report.value = resReport
        homeTeamReportItems.value = resHomeTeamReportItems
        awayTeamReportItems.value = resAwayTeamReportItems
        match.value = await fetchMatch(report.value.match.id)
        if (loginUser.value) like.value = await fetchIsLike(loginUser.value.uid, reportId)
        isLoadingReport.value = false
        if (report.value.user.id !== 'guest') {
          isLoadingUser.value = true
          user.value = await fetchUser(report.value.user.id)
          if (loginUser.value) {
            follow.value = await fetchIsFollow(loginUser.value.uid, report.value.user.id)
          }
          isLoadingUser.value = false
        }
        isLoadingSameMatchReports.value = true
        sameMatchReports.value = await fetchSameMatchReports(report.value.match.id, reportId)
        isLoadingSameMatchReports.value = false
        isLoadingComments.value = true
        unsubscribeComments.value = await subscribeComments(reportId, comments.value)
        isLoadingComments.value = false
      } else {
        throw new Error('Not Found')
      }
    } catch (error) {
      console.log(error)
      if (error instanceof Error && error.message === 'unauthorized access') {
        openSnackbar('failure', '不正なアクセスが発生しました。')
        router.push('/')
      } else if (error instanceof Error && error.message === 'Not Found') {
        openSnackbar('failure', '対象の選手採点は見つかりませんでした。')
      } else {
        openSnackbar('failure', '通信エラーが発生しました。')
      }
    } finally {
      isLoadingReport.value = false
      isLoadingUser.value = false
      isLoadingSameMatchReports.value = false
      isLoadingComments.value = false
    }
  }

  /** sns share */
  const dialogShare = ref(false)
  const showDialogShare = (): void => {
    if (process.client && route.value.params.publish === 'true') dialogShare.value = true
  }
  const hideDialogShare = (): void => {
    dialogShare.value = false
  }
  const share = (type: 'twitter' | 'facebook'): void => {
    const shareUrl =
      type === 'twitter'
        ? 'https://twitter.com/intent/tweet?text=' +
          `${report.value?.homeTeam.name} vs ${report.value?.awayTeam.name} の選手採点` +
          '%20%23選手採点' +
          '%20%23フットレポ' +
          '&url=' +
          location.href
        : 'http://www.facebook.com/share.php?u=' + location.href
    window.open(shareUrl)
  }

  /** like */
  const isLoadingUpdateLike = ref(false)
  const updateLike = async (): Promise<void> => {
    if (!loginUser.value || !report.value) return
    try {
      isLoadingUpdateLike.value = true
      await doLike(loginUser.value.uid, report.value.id)
      like.value = !like.value
      if (report.value && like.value) {
        report.value.likeCount++
      } else if (report.value && !like.value) {
        report.value.likeCount--
      }
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。通信状況をお確かめ下さい。')
    } finally {
      isLoadingUpdateLike.value = false
    }
  }

  /** follow */
  const isLoadingUpdateFollow = ref(false)
  const updateFollow = async (userId: string): Promise<void> => {
    if (!loginUser.value) return
    try {
      isLoadingUpdateFollow.value = true
      await doFollow(loginUser.value.uid, userId)
      follow.value = !follow.value
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。通信状況をお確かめ下さい。')
    } finally {
      isLoadingUpdateFollow.value = false
    }
  }

  /** comments */
  const newComment = ref('')
  const isLoadingNewComment = ref(false)
  const isDialog = ref(false)
  const hideDialog = (): void => {
    confirmation.isLogin = true
    isDialog.value = false
  }
  const confirmLogin = (): void => {
    !confirmation.isLogin && !loginUser.value ? (isDialog.value = true) : createComment()
  }
  const createComment = () => {
    if (!report.value) return
    try {
      hideDialog()
      isLoadingNewComment.value = true
      postComment(report.value.id, loginUser.value, newComment.value)
      newComment.value = ''
      window.navigator.onLine
        ? openSnackbar('success', 'コメントを作成しました。')
        : openSnackbar(
            'success',
            'オフラインでコメントを作成しました。オンラインに接続されると自動的にコメントが反映されます。'
          )
    } catch (error) {
      console.log(error)
      openSnackbar('failure', 'コメントの作成に失敗しました。')
    } finally {
      isLoadingNewComment.value = false
    }
  }
  onBeforeUnmount(() => {
    if (unsubscribeComments.value) unsubscribeComments.value()
  })

  return {
    awayTeamReportItems,
    comments,
    confirmLogin,
    createComment,
    dialogShare,
    follow,
    hideDialogShare,
    homeTeamReportItems,
    isDialog,
    isLoadingComments,
    isLoadingNewComment,
    isLoadingReport,
    isLoadingSameMatchReports,
    isLoadingUpdateFollow,
    isLoadingUpdateLike,
    isLoadingUser,
    like,
    match,
    newComment,
    report,
    sameMatchReports,
    setUp,
    share,
    showDialogShare,
    updateFollow,
    updateLike,
    user
  }
}

export default useShow
