import { ref, Ref } from '@nuxtjs/composition-api'
import { getReportAndItems } from '@/db/reports'
import { getMatch } from '@/db/matches'

const useShow = () => {
  const report: Ref<Report | null> = ref(null)
  const homeTeamReportItems: Ref<ReportItem[]> = ref([])
  const awayTeamReportItems: Ref<ReportItem[]> = ref([])
  const match: Ref<Match | null> = ref(null)

  const isLoadingReport = ref(false)
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

      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoadingReport.value = false
    }
  }

  return { report, homeTeamReportItems, awayTeamReportItems, match, isLoadingReport, setUp }
}

export default useShow
