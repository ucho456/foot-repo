import { reactive, ref, Ref } from '@nuxtjs/composition-api'
import { getMatch } from '@/db/matchesCollection'
import { getForReport } from '@/db/forReportCollection'

const useNew = () => {
  const report: {
    title: string
    selectTeam: HomeAway
    homeTeamReportItems: ReportItem[]
    awayTeamReportItems: ReportItem[]
    summary: string
    momId: string
  } = reactive({
    title: '',
    selectTeam: 'home',
    homeTeamReportItems: [],
    awayTeamReportItems: [],
    summary: '',
    momId: ''
  })
  const match: Ref<Match | null> = ref(null)
  const isLoadingSetUp = ref(false)

  const setUp = async (matchId: string): Promise<'success' | 'failure'> => {
    try {
      isLoadingSetUp.value = true
      match.value = await getMatch(matchId)
      const forReport = await getForReport(matchId)
      if (forReport) {
        report.homeTeamReportItems = forReport.homeTeamReportItems
        report.awayTeamReportItems = forReport.awayTeamReportItems
      }
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoadingSetUp.value = false
    }
  }

  return { report, match, isLoadingSetUp, setUp }
}

export default useNew
