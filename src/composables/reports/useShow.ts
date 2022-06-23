import { ref, Ref } from '@nuxtjs/composition-api'
import type { Unsubscribe } from 'firebase/firestore'
import { fetchMatch } from '@/db/matches'
import {
  createComment,
  fetchSameMatchReports,
  fetchReportAndItems,
  updateLikeCount,
  subscribeComments
} from '@/db/reports'
import { fetchUser } from '@/db/users'
import useLoginUser from '@/utils/useLoginUser'

const useShow = () => {
  const { loginUser } = useLoginUser()

  const report: Ref<Report | null> = ref(null)
  const homeTeamReportItems: Ref<ReportItem[]> = ref([])
  const awayTeamReportItems: Ref<ReportItem[]> = ref([])
  const match: Ref<Match | null> = ref(null)
  const user: Ref<User | null> = ref(null)
  const sameMatchReports: Ref<Report[]> = ref([])
  const comments: Ref<ReportComment[]> = ref([])
  const unsubscribeComments: Ref<Unsubscribe | null> = ref(null)

  const isLoadingReport = ref(false)
  const isLoadingUser = ref(false)
  const isLoadingSameMatchReports = ref(false)
  const isLoadingComments = ref(false)
  const setUp = async (
    reportId: string
  ): Promise<'success' | 'failure' | 'unauthorized access'> => {
    try {
      isLoadingReport.value = true
      const { resReport, resHomeTeamReportItems, resAwayTeamReportItems } =
        await fetchReportAndItems(reportId, loginUser.value?.uid)
      report.value = resReport
      homeTeamReportItems.value = resHomeTeamReportItems
      awayTeamReportItems.value = resAwayTeamReportItems
      match.value = await fetchMatch(report.value?.match.id!)
      isLoadingReport.value = false

      isLoadingUser.value = true
      user.value = await fetchUser(resReport.user.ref.id)
      isLoadingUser.value = false

      isLoadingSameMatchReports.value = true
      sameMatchReports.value = await fetchSameMatchReports(resReport.match.id, reportId)
      isLoadingSameMatchReports.value = false

      isLoadingComments.value = true
      unsubscribeComments.value = await subscribeComments(reportId, comments.value)
      isLoadingComments.value = false

      return 'success'
    } catch (error) {
      return error instanceof Error && error.message === 'unauthorized access'
        ? 'unauthorized access'
        : 'failure'
    } finally {
      isLoadingReport.value = false
      isLoadingUser.value = false
      isLoadingSameMatchReports.value = false
      isLoadingComments.value = false
    }
  }

  const shareTwitter = (): void => {
    const shareUrl =
      'https://twitter.com/intent/tweet?text=' +
      `${report.value?.homeTeam.name} vs ${report.value?.awayTeam.name} の選手採点` +
      '%20%23選手採点' +
      '%20%23フットレポ' +
      '&url=' +
      location.href
    window.open(shareUrl)
  }

  const like = ref(false)
  const clickLike = async () => {
    try {
      like.value = !like.value
      await updateLikeCount(report.value?.id!, like.value)
      if (report.value && like.value) {
        report.value.likeCount++
      } else if (report.value && !like.value) {
        report.value.likeCount--
      }
    } catch {
      return 'failure'
    } finally {
      //
    }
  }

  const inputComment = ref('')
  const isLoadingNewComment = ref(false)
  const isDialog = ref(false)
  const create = async (): Promise<'success' | 'failure'> => {
    try {
      isLoadingNewComment.value = true
      if (report.value) {
        await createComment(report.value.id, loginUser.value, inputComment.value)
        inputComment.value = ''
        return 'success'
      } else {
        return 'failure'
      }
    } catch (error) {
      console.log(error)
      return 'failure'
    } finally {
      isLoadingNewComment.value = false
    }
  }

  return {
    report,
    homeTeamReportItems,
    awayTeamReportItems,
    match,
    user,
    sameMatchReports,
    comments,
    unsubscribeComments,
    isLoadingReport,
    isLoadingUser,
    isLoadingSameMatchReports,
    isLoadingComments,
    setUp,
    like,
    clickLike,
    shareTwitter,
    inputComment,
    isLoadingNewComment,
    isDialog,
    create
  }
}

export default useShow
