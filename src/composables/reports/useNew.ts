import { reactive, ref, Ref, watch } from '@nuxtjs/composition-api'
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

  watch(
    () => report.selectTeam,
    (newVal, oldVal) => {
      if ((newVal === 'home' && oldVal === 'away') || (newVal === 'away' && oldVal === 'home')) {
        report.momId = ''
      }
    }
  )

  const isLoading = ref(false)

  const create = () => {
    try {
      isLoading.value = true
      console.log('create')
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  const save = () => {
    try {
      isLoading.value = true
      console.log('save')
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  return { report, match, isLoadingSetUp, setUp, isLoading, create, save }
}

export default useNew