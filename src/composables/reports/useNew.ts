import { reactive, ref, Ref, watch } from '@nuxtjs/composition-api'
import { getForReport, fetchMatch } from '@/db/matches'
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
      const forReport = await getForReport(matchId)
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

  const isLoading = ref(false)

  const create = async () => {
    try {
      isLoading.value = true
      await createReport(currentUser.value, inputReport, match.value!)
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
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  return { inputReport, match, isLoadingSetUp, setUp, isLoading, create, save }
}

export default useNew
