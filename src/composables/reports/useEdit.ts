import { reactive, ref, Ref, watch } from '@nuxtjs/composition-api'
import { fetchMatch } from '@/db/matches'
import { fetchReportAndItems } from '@/db/reports'

const useEdit = () => {
  const initReport: Ref<Report | null> = ref(null)
  // const initHomeTeamReportItems: Ref<ReportItem[]> = ref([])
  // const initAwayTeamReportItems: Ref<ReportItem[]> = ref([])
  const inputReport: InputReport = reactive({
    title: '',
    selectTeam: 'both',
    homeTeamReportItems: [],
    awayTeamReportItems: [],
    summary: '',
    momId: ''
  })
  const match: Ref<Match | null> = ref(null)

  const isLoadingSetUp = ref(false)
  const setUp = async (
    reportId: string,
    uid: string
  ): Promise<'success' | 'failure' | 'invalid access'> => {
    try {
      isLoadingSetUp.value = true
      const { resReport, resHomeTeamReportItems, resAwayTeamReportItems } =
        await fetchReportAndItems(reportId)
      if (resReport.user.ref.id !== uid) {
        return 'invalid access'
      }
      initReport.value = resReport
      inputReport.title = resReport.title
      inputReport.selectTeam = resReport.selectTeam
      inputReport.homeTeamReportItems = resHomeTeamReportItems
      inputReport.awayTeamReportItems = resAwayTeamReportItems
      inputReport.summary = resReport.summary
      inputReport.momId = resReport.momId // momIdの初期値がセレクトボックスに反映されない。
      match.value = await fetchMatch(resReport.match.id)
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

  return { inputReport, match, isLoadingSetUp, setUp }
}

export default useEdit
