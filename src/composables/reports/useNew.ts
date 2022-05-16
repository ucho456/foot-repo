import { reactive, ref, Ref } from '@nuxtjs/composition-api'
import { getMatch } from '@/db/matchesCollection'
import { getForReport } from '@/db/forReportCollection'

const useNew = () => {
  const report: {
    title: string
    selectTeam: HomeAway
    homeTeamPlayers: Player[]
    awayTeamPlayers: Player[]
    summary: string
    momId: string
  } = reactive({
    title: '',
    selectTeam: 'home',
    homeTeamPlayers: [],
    awayTeamPlayers: [],
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
        report.homeTeamPlayers = forReport.homePlayers
        report.awayTeamPlayers = forReport.awayPlayers
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
