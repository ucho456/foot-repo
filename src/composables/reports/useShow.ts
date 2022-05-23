import { ref, Ref } from '@nuxtjs/composition-api'
import { getReportById } from '@/db/reports'
import { getMatchByRef } from '@/db/matches'

const useShow = () => {
  const report: Ref<Report | null> = ref(null)
  const homeTeamReportItems: Ref<ReportItem[]> = ref([])
  const awayTeamReportItems: Ref<ReportItem[]> = ref([])
  const match: Ref<Match | null> = ref(null)

  const isLoadingSetUp = ref(false)
  const setUp = async (reportId: string): Promise<'success' | 'failure'> => {
    try {
      isLoadingSetUp.value = true
      await getReportById(reportId, report, homeTeamReportItems, awayTeamReportItems)
      await getMatchByRef(report.value?.match.ref!, match)
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoadingSetUp.value = false
    }
  }

  return { report, homeTeamReportItems, awayTeamReportItems, match, isLoadingSetUp, setUp }
}

export default useShow
