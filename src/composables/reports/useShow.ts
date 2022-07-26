/** check */
import { ref, useRoute, useRouter } from '@nuxtjs/composition-api'
import { fetchMatch } from '@/db/matches'
import {
  doLike,
  fetchComments,
  fetchReport,
  fetchReportFromFunctions,
  fetchReportItems,
  fetchSameMatchReports,
  postComment
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

  /** setUp */
  const report = ref<Report | null>(null)
  const homeTeamReportItems = ref<ReportItem[]>([])
  const awayTeamReportItems = ref<ReportItem[]>([])
  const match = ref<Match | null>(null)
  const ssrSetUp = async () => {
    const reportId = route.value.params.id as string
    const { result, resReport, resHomeTeamReportItems, resAwayTeamReportItems, resMatch } =
      await fetchReportFromFunctions(reportId)
    if (result === 'success') {
      report.value = resReport
      homeTeamReportItems.value = resHomeTeamReportItems
      awayTeamReportItems.value = resAwayTeamReportItems
      match.value = resMatch
    } else {
      openSnackbar('failure', 'ページが見つかりませんでした。ホーム画面に遷移します。')
      router.push('/')
    }
  }

  const isLoadingReport = ref(false)
  const csrSetUp = async () => {
    try {
      isLoadingReport.value = true
      const reportId = route.value.params.id as string
      const resReport = await fetchReport(reportId)
      if (resReport) {
        const { resHomeTeamReportItems, resAwayTeamReportItems } = await fetchReportItems(resReport)
        report.value = resReport
        homeTeamReportItems.value = resHomeTeamReportItems
        awayTeamReportItems.value = resAwayTeamReportItems
        match.value = await fetchMatch(report.value.match.id)
      }
    } catch (error) {
      console.log(error)
      openSnackbar('failure', 'ページが見つかりませんでした。ホーム画面に遷移します。')
      router.push('/')
    } finally {
      isLoadingReport.value = false
    }
  }

  const user = ref<User | null>(null)
  const sameMatchReports = ref<Report[]>([])
  const comments = ref<ReportComment[]>([])
  const like = ref(false)
  const follow = ref(false)
  const disabledLikeButton = ref(false)
  const showFollowButton = ref(false)
  const commentUser = ref<{ name: string; imageUrl: string | null }>({
    name: 'Guest',
    imageUrl: null
  })
  const isLoadingUser = ref(false)
  const isLoadingSameMatchReports = ref(false)
  const isLoadingComments = ref(false)
  const commonSetUp = async () => {
    if (!report.value) return
    try {
      const uid = loginUser.value?.uid
      if (!report.value.publish && report.value.user.id !== uid) {
        throw new Error('unauthorized access')
      }
      const reportId = route.value.params.id as string
      if (!loginUser.value || loginUser.value.uid === report.value.user.id) {
        disabledLikeButton.value = true
      }
      if (loginUser.value) like.value = await fetchIsLike(loginUser.value.uid, reportId)
      if (report.value.user.id !== 'guest') {
        isLoadingUser.value = true
        user.value = await fetchUser(report.value.user.id)
        if (loginUser.value && loginUser.value.uid !== report.value.user.id) {
          follow.value = await fetchIsFollow(loginUser.value.uid, report.value.user.id)
          showFollowButton.value = true
        }
        isLoadingUser.value = false
      }
      isLoadingSameMatchReports.value = true
      sameMatchReports.value = await fetchSameMatchReports(report.value.match.id, reportId)
      isLoadingSameMatchReports.value = false
      isLoadingComments.value = true
      comments.value = await fetchComments(reportId)
      if (loginUser.value) {
        commentUser.value.name = loginUser.value.name
        commentUser.value.imageUrl = loginUser.value.imageUrl
      }
      isLoadingComments.value = false
    } catch (error) {
      console.log(error)
      if (error instanceof Error && error.message === 'unauthorized access') {
        openSnackbar('failure', '不正なアクセスが発生しました。')
        router.push('/')
      } else {
        openSnackbar('failure', '通信エラーが発生しました。')
      }
    } finally {
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
      openSnackbar('failure', '通信エラーが発生しました。')
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
      openSnackbar('failure', '通信エラーが発生しました。')
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
  const createComment = async (): Promise<void> => {
    if (!report.value) return
    try {
      hideDialog()
      isLoadingNewComment.value = true
      const resNewComment = await postComment(report.value.id, loginUser.value, newComment.value)
      comments.value.push(resNewComment)
      newComment.value = ''
      openSnackbar('success', 'コメントを作成しました。')
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoadingNewComment.value = false
    }
  }

  return {
    awayTeamReportItems,
    comments,
    commentUser,
    commonSetUp,
    confirmLogin,
    createComment,
    csrSetUp,
    dialogShare,
    disabledLikeButton,
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
    share,
    showDialogShare,
    showFollowButton,
    ssrSetUp,
    updateFollow,
    updateLike,
    user
  }
}

export default useShow
