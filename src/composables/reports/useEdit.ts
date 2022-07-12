import { reactive, ref, watch } from '@nuxtjs/composition-api'
import { fetchMatch } from '@/db/matches'
import { fetchReport, putReport } from '@/db/reports'

const useEdit = () => {
  const initReport = ref<Report | null>(null)
  // const initHomeTeamReportItems<ReportItem[]> = ref([])
  // const initAwayTeamReportItems<ReportItem[]> = ref([])
  const inputReport: InputReport = reactive({
    title: '',
    selectTeam: 'both',
    homeTeamReportItems: [],
    awayTeamReportItems: [],
    summary: '',
    momId: '',
    publish: true
  })
  const match = ref<Match | null>(null)

  const isLoadingSetUp = ref(false)
  const setUp = async (
    reportId: string,
    uid: string
  ): Promise<'success' | 'failure' | 'unauthorized access'> => {
    try {
      isLoadingSetUp.value = true
      const { resReport, resHomeTeamReportItems, resAwayTeamReportItems } = await fetchReport(
        reportId,
        uid
      )
      if (resReport.user.id !== uid) throw new Error('unauthorized access')
      initReport.value = resReport
      inputReport.title = resReport.title
      inputReport.selectTeam = resReport.selectTeam
      inputReport.homeTeamReportItems = resHomeTeamReportItems
      inputReport.awayTeamReportItems = resAwayTeamReportItems
      inputReport.summary = resReport.summary
      inputReport.momId = resReport.momId
      inputReport.publish = resReport.publish
      match.value = await fetchMatch(resReport.match.id)
      return 'success'
    } catch (error) {
      console.log(error)
      return error instanceof Error && error.message === 'unauthorized access'
        ? 'unauthorized access'
        : 'failure'
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
      inputReport.publish = true
      await putReport(inputReport, initReport.value!)
      return 'success'
    } catch (error) {
      console.log(error)
      return 'failure'
    } finally {
      isLoadingSend.value = false
    }
  }

  const save = async (): Promise<'success' | 'failure'> => {
    try {
      isLoadingSend.value = true
      inputReport.publish = false
      await putReport(inputReport, initReport.value!)
      return 'success'
    } catch (error) {
      console.log(error)
      return 'failure'
    } finally {
      isLoadingSend.value = false
    }
  }

  return { inputReport, match, isLoadingSetUp, setUp, isLoadingSend, update, save }
}

export default useEdit
