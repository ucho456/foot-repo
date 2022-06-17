import { reactive, ref, Ref, watch } from '@nuxtjs/composition-api'
import { fetchForReport, fetchMatch } from '@/db/matches'
import { createReport } from '@/db/reports'
import useLoginUser from '@/utils/useLoginUser'

const useNew = () => {
  const { loginUser } = useLoginUser()

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
  const create = async (): Promise<{ result: string; reportId: string }> => {
    try {
      isLoadingSend.value = true
      const reportId = await createReport(loginUser.value, inputReport, match.value!)
      return { result: 'success', reportId }
    } catch {
      return { result: 'failure', reportId: '' }
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
