import { ref, Ref } from '@nuxtjs/composition-api'
import type { Unsubscribe } from 'firebase/firestore'
import { getMatch } from '@/db/matches'
import { createComment, getReportAndItems, subscribeComments } from '@/db/reports'
import { fetchUser } from '@/db/users'
import useCurrentUser from '@/utils/useCurrentUser'

const useShow = () => {
  const { currentUser } = useCurrentUser()

  const report: Ref<Report | null> = ref(null)
  const homeTeamReportItems: Ref<ReportItem[]> = ref([])
  const awayTeamReportItems: Ref<ReportItem[]> = ref([])
  const match: Ref<Match | null> = ref(null)
  const user: Ref<User | null> = ref(null)
  const comments: Ref<ReportComment[]> = ref([])
  const unsubscribe: Ref<Unsubscribe | null> = ref(null)

  const isLoadingReport = ref(false)
  const isLoadingUser = ref(false)
  const isLoadingComment = ref(false)
  const setUp = async (reportId: string): Promise<'success' | 'failure'> => {
    try {
      isLoadingReport.value = true
      const { resReport, resHomeTeamReportItems, resAwayTeamReportItems } = await getReportAndItems(
        reportId
      )
      report.value = resReport
      homeTeamReportItems.value = resHomeTeamReportItems
      awayTeamReportItems.value = resAwayTeamReportItems
      match.value = await getMatch(report.value?.match.id!)
      isLoadingReport.value = false

      isLoadingUser.value = true
      user.value = await fetchUser(report.value.user.ref.id)
      isLoadingUser.value = false

      isLoadingComment.value = true
      unsubscribe.value = await subscribeComments(reportId, comments.value)
      isLoadingComment.value = false

      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoadingReport.value = false
      isLoadingUser.value = false
      isLoadingComment.value = false
    }
  }

  const inputComment = ref('')
  const isLoadingNewComment = ref(false)
  const create = async (): Promise<'success' | 'failure'> => {
    try {
      isLoadingNewComment.value = true
      if (report.value && currentUser.value) {
        await createComment(report.value.id, currentUser!.value, inputComment.value)
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
    comments,
    unsubscribe,
    isLoadingReport,
    isLoadingUser,
    isLoadingComment,
    setUp,
    inputComment,
    isLoadingNewComment,
    create
  }
}

export default useShow
