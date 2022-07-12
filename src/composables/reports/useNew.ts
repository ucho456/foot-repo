import { reactive, ref, watch } from '@nuxtjs/composition-api'
import { fetchForReport, fetchMatch } from '@/db/matches'
import { postReport } from '@/db/reports'
import useLoginUser from '@/utils/useLoginUser'

const useNew = () => {
  const { loginUser } = useLoginUser()

  const inputReport: InputReport = reactive({
    title: '',
    selectTeam: 'home',
    homeTeamReportItems: [],
    awayTeamReportItems: [],
    summary: '',
    momId: '',
    publish: true
  })
  const match = ref<Match | null>(null)

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
      if (loginUser.value?.team.id === match.value?.awayTeam.id) {
        inputReport.selectTeam = 'away'
      }
      return 'success'
    } catch (error) {
      console.log(error)
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
      inputReport.publish = true
      const reportId = await postReport(loginUser.value, inputReport, match.value!)
      return { result: 'success', reportId }
    } catch (error) {
      console.log(error)
      return { result: 'failure', reportId: '' }
    } finally {
      isLoadingSend.value = false
    }
  }

  const save = async (): Promise<{ result: string; reportId: string }> => {
    try {
      isLoadingSend.value = true
      inputReport.publish = false
      const reportId = await postReport(loginUser.value, inputReport, match.value!)
      return { result: 'success', reportId }
    } catch (error) {
      console.log(error)
      return { result: 'failure', reportId: '' }
    } finally {
      isLoadingSend.value = false
    }
  }

  return { inputReport, match, isLoadingSetUp, setUp, isLoadingSend, create, save }
}

export default useNew
