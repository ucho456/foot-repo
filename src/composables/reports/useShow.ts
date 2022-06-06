import { ref, Ref } from '@nuxtjs/composition-api'
import type { Unsubscribe } from 'firebase/firestore'
import { fetchMatch } from '@/db/matches'
import {
  createComment,
  fetchSameMatchReports,
  fetchReportAndItems,
  subscribeComments
} from '@/db/reports'
import { fetchUser } from '@/db/users'
import useCurrentUser from '@/utils/useCurrentUser'

const useShow = () => {
  const { currentUser } = useCurrentUser()

  const report: Ref<Report | null> = ref(null)
  const homeTeamReportItems: Ref<ReportItem[]> = ref([])
  const awayTeamReportItems: Ref<ReportItem[]> = ref([])
  const match: Ref<Match | null> = ref(null)
  const user: Ref<User | null> = ref(null)
  const sameMatchReports: Ref<Report[]> = ref([])
  const comments: Ref<ReportComment[]> = ref([])
  const unsubscribe: Ref<Unsubscribe | null> = ref(null)

  const isLoadingReport = ref(false)
  const isLoadingUser = ref(false)
  const isLoadingSameMatchReports = ref(false)
  const isLoadingComments = ref(false)
  const setUp = async (reportId: string): Promise<'success' | 'failure'> => {
    try {
      isLoadingReport.value = true
      const { resReport, resHomeTeamReportItems, resAwayTeamReportItems } =
        await fetchReportAndItems(reportId)
      report.value = resReport
      homeTeamReportItems.value = resHomeTeamReportItems
      awayTeamReportItems.value = resAwayTeamReportItems
      match.value = await fetchMatch(report.value?.match.id!)
      isLoadingReport.value = false

      isLoadingUser.value = true
      user.value = await fetchUser(report.value.user.ref.id)
      isLoadingUser.value = false

      isLoadingSameMatchReports.value = true
      sameMatchReports.value = await fetchSameMatchReports(resReport.match.id, reportId)
      isLoadingSameMatchReports.value = false

      isLoadingComments.value = true
      unsubscribe.value = await subscribeComments(reportId, comments.value)
      isLoadingComments.value = false

      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoadingReport.value = false
      isLoadingUser.value = false
      isLoadingSameMatchReports.value = false
      isLoadingComments.value = false
    }
  }

  const inputComment = ref('')
  const isLoadingNewComment = ref(false)
  const create = async (): Promise<'success' | 'failure'> => {
    try {
      isLoadingNewComment.value = true
      if (report.value) {
        await createComment(report.value.id, currentUser.value, inputComment.value)
        inputComment.value = ''
        return 'success'
      } else {
        return 'failure'
      }
    } catch {
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
    unsubscribe,
    isLoadingReport,
    isLoadingUser,
    isLoadingSameMatchReports,
    isLoadingComments,
    setUp,
    inputComment,
    isLoadingNewComment,
    create
  }
}

export default useShow
