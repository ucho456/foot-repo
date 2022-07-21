/** check */
import { reactive, ref, useRoute, useRouter, watch } from '@nuxtjs/composition-api'
import { fetchForReport, fetchMatch } from '@/db/matches'
import { postReport } from '@/db/reports'
import useLoginUser from '@/utils/useLoginUser'
import useSnackbar from '@/utils/useSnackbar'

const useNew = () => {
  const route = useRoute()
  const router = useRouter()
  const { loginUser } = useLoginUser()
  const { openSnackbar } = useSnackbar()

  const newReport: InputReport = reactive({
    title: '',
    selectTeam: 'home',
    homeTeamReportItems: [],
    awayTeamReportItems: [],
    summary: '',
    momId: '',
    publish: true
  })
  const match = ref<Match | null>(null)

  /** setUp */
  const isLoadingSetUp = ref(false)
  const setUp = async (): Promise<void> => {
    try {
      isLoadingSetUp.value = true
      const matchId = route.value.query.matchId as string
      match.value = await fetchMatch(matchId)
      const forReport = await fetchForReport(matchId)
      if (!match.value || !forReport) throw new Error('Not Found')
      newReport.homeTeamReportItems = forReport.homeTeamReportItems
      newReport.awayTeamReportItems = forReport.awayTeamReportItems
      if (loginUser.value && loginUser.value.team.id === match.value.awayTeam.id) {
        newReport.selectTeam = 'away'
      }
    } catch (error) {
      error instanceof Error && error.message === 'Not Found'
        ? openSnackbar('failure', 'データが見つかりませんでした。')
        : openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoadingSetUp.value = false
    }
  }

  watch(
    () => newReport.selectTeam,
    (newVal, oldVal) => {
      if ((newVal === 'home' && oldVal === 'away') || (newVal === 'away' && oldVal === 'home')) {
        newReport.momId = ''
      }
    }
  )

  /** create report */
  const isLoadingCreate = ref(false)
  const createReport = async (publish: boolean): Promise<void> => {
    if (!match.value) return
    try {
      isLoadingCreate.value = true
      newReport.publish = publish
      const reportId = await postReport(loginUser.value, newReport, match.value)
      const message = publish ? '選手採点を作成しました。' : '選手採点を一時保存しました。'
      openSnackbar('success', message)
      router.push({
        name: `reports-id`,
        params: { id: reportId, publish: String(publish) }
      })
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoadingCreate.value = false
    }
  }

  return { createReport, isLoadingCreate, isLoadingSetUp, match, newReport, setUp }
}

export default useNew
