/** check */
import { reactive, ref, useRoute, useRouter } from '@nuxtjs/composition-api'
import { fetchMatch } from '@/db/matches'
import { fetchReport, putReport } from '@/db/reports'
import useLoginUser from '@/utils/useLoginUser'
import useSnackbar from '@/utils/useSnackbar'

const useEdit = () => {
  const route = useRoute()
  const router = useRouter()
  const { loginUser } = useLoginUser()
  const { openSnackbar } = useSnackbar()

  const initReport = ref<Report | null>(null)
  const editReport: InputReport = reactive({
    title: '',
    selectTeam: 'both',
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
    if (!loginUser.value) return
    try {
      isLoadingSetUp.value = true
      const reportId = route.value.query.reportId as string
      const { resReport, resHomeTeamReportItems, resAwayTeamReportItems } = await fetchReport(
        reportId,
        loginUser.value.uid
      )
      if (resReport.user.id !== loginUser.value.uid) throw new Error('unauthorized access')
      initReport.value = { ...resReport }
      editReport.title = resReport.title
      editReport.selectTeam = resReport.selectTeam
      editReport.homeTeamReportItems = resHomeTeamReportItems
      editReport.awayTeamReportItems = resAwayTeamReportItems
      editReport.summary = resReport.summary
      editReport.momId = resReport.momId
      editReport.publish = resReport.publish
      match.value = await fetchMatch(resReport.match.id)
    } catch (error) {
      console.log(error)
      if (error instanceof Error && error.message === 'unauthorized access') {
        openSnackbar('failure', '不正なアクセスが発生しました。')
        router.push('/')
      } else {
        openSnackbar('failure', 'データの取得に失敗しました。')
      }
    } finally {
      isLoadingSetUp.value = false
    }
  }

  /** updateReport */
  const isLoadingUpdate = ref(false)
  const updateReport = async (): Promise<void> => {
    if (!initReport.value) return
    try {
      isLoadingUpdate.value = true
      editReport.publish = true
      await putReport(editReport, initReport.value!)
      openSnackbar('success', '選手採点を更新しました。')
      router.push({ name: 'reports-id', params: { id: initReport.value.id, publish: 'true' } })
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '選手採点の更新に失敗しました。')
    } finally {
      isLoadingUpdate.value = false
    }
  }
  const saveReport = async (): Promise<void> => {
    if (!initReport.value) return
    try {
      isLoadingUpdate.value = true
      editReport.publish = false
      await putReport(editReport, initReport.value!)
      openSnackbar('success', '選手採点を一時保存しました。')
      router.push(`/reports/${initReport.value.id}`)
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '選手採点の一時保存に失敗しました。')
    } finally {
      isLoadingUpdate.value = false
    }
  }

  return { editReport, match, isLoadingSetUp, setUp, isLoadingUpdate, updateReport, saveReport }
}

export default useEdit
