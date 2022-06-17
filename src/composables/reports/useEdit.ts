import { reactive, ref, Ref, watch } from '@nuxtjs/composition-api'
import { fetchMatch } from '@/db/matches'
import { fetchReportAndItems, updateReport } from '@/db/reports'

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
  ): Promise<'success' | 'failure' | 'unauthorized access'> => {
    try {
      isLoadingSetUp.value = true
      const { resReport, resHomeTeamReportItems, resAwayTeamReportItems } =
        await fetchReportAndItems(reportId)
      if (resReport.user.ref.id !== uid) {
        return 'unauthorized access'
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

  const isLoadingSend = ref(false)
  const update = async (): Promise<'success' | 'failure'> => {
    try {
      isLoadingSend.value = true
      await updateReport(inputReport, initReport.value!)
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

  return { inputReport, match, isLoadingSetUp, setUp, isLoadingSend, update, save }
}

export default useEdit
