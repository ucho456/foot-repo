import { ref, Ref } from '@nuxtjs/composition-api'
import { getMatch } from '@/db/matches'
import { getReportAndItems } from '@/db/reports'
import { fetchUser } from '@/db/users'

const useShow = () => {
  const report: Ref<Report | null> = ref(null)
  const homeTeamReportItems: Ref<ReportItem[]> = ref([])
  const awayTeamReportItems: Ref<ReportItem[]> = ref([])
  const match: Ref<Match | null> = ref(null)
  const user: Ref<User | null> = ref(null)

  const isLoadingReport = ref(false)
  const isLoadingUser = ref(false)
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

      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoadingReport.value = false
      isLoadingUser.value = false
    }
  }

  return {
    report,
    homeTeamReportItems,
    awayTeamReportItems,
    match,
    user,
    isLoadingReport,
    isLoadingUser,
    setUp
  }
}

export default useShow
