/** check */
import { reactive, ref, useRoute, useRouter } from '@nuxtjs/composition-api'
import { fetchMatch } from '@/db/matches'
import { fetchReport, fetchReportItems, putReport } from '@/db/reports'
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
    try {
      if (!loginUser.value) throw new Error('unauthorized access')
      isLoadingSetUp.value = true
      const reportId = route.value.query.reportId as string
      const resReport = await fetchReport(reportId, 'true')
      if (resReport) {
        if (resReport.user.id !== loginUser.value.uid) throw new Error('unauthorized access')
        const { resHomeTeamReportItems, resAwayTeamReportItems } = await fetchReportItems(
          resReport,
          'true'
        )
        initReport.value = { ...resReport }
        editReport.title = resReport.title
        editReport.selectTeam = resReport.selectTeam
        editReport.homeTeamReportItems = resHomeTeamReportItems
        editReport.awayTeamReportItems = resAwayTeamReportItems
        editReport.summary = resReport.summary
        editReport.momId = resReport.momId
        editReport.publish = resReport.publish
        match.value = await fetchMatch(resReport.match.id)
      } else {
        throw new Error('Not Found')
      }
    } catch (error) {
      console.log(error)
      if (error instanceof Error && error.message === 'unauthorized access') {
        openSnackbar('failure', '不正なアクセスが発生しました。')
        router.push('/')
      } else if (error instanceof Error && error.message === 'Not Found') {
        openSnackbar('failure', '見つかりませんでした。')
      } else {
        openSnackbar('failure', 'データの取得に失敗しました。')
      }
    } finally {
      isLoadingSetUp.value = false
    }
  }

  /** update report */
  const isLoadingUpdate = ref(false)
  const updateReport = (publish: boolean) => {
    if (!initReport.value) return
    try {
      isLoadingUpdate.value = true
      editReport.publish = publish
      putReport(editReport, initReport.value!)
      const message = publish ? '選手採点を更新しました。' : '選手採点を一時保存しました。'
      openSnackbar('success', message)
      router.push({
        name: 'reports-id',
        params: { id: initReport.value.id, publish: String(publish), cashe: 'true' }
      })
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '選手採点の更新に失敗しました。')
    } finally {
      isLoadingUpdate.value = false
    }
  }

  return { editReport, isLoadingSetUp, isLoadingUpdate, match, setUp, updateReport }
}

export default useEdit
