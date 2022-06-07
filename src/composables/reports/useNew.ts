import { reactive, ref, Ref, watch } from '@nuxtjs/composition-api'
import { fetchForReport, fetchMatch } from '@/db/matches'
import { createReport } from '@/db/reports'
import useCurrentUser from '@/utils/useCurrentUser'

const useNew = () => {
  const { currentUser } = useCurrentUser()

  const inputReport: InputReport = reactive({
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
      match.value = await fetchMatch(matchId)
      const forReport = await fetchForReport(matchId)
      if (forReport) {
        inputReport.homeTeamReportItems = forReport.homeTeamReportItems
        inputReport.awayTeamReportItems = forReport.awayTeamReportItems
      }
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoadingSetUp.value = false
    }
  }

  watch(
    () => inputReport.selectTeam,
    (newVal, oldVal) => {
      if ((newVal === 'home' && oldVal === 'away') || (newVal === 'away' && oldVal === 'home')) {
        inputReport.momId = ''
      }
    }
  )

  const isLoadingSend = ref(false)
  const create = async () => {
    try {
      isLoadingSend.value = true
      await createReport(currentUser.value, inputReport, match.value!)
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoadingSend.value = false
    }
  }
  const save = () => {
    try {
      isLoadingSend.value = true
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoadingSend.value = false
    }
  }

  return { inputReport, match, isLoadingSetUp, setUp, isLoadingSend, create, save }
}

export default useNew
