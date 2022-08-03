/** check */
import { ref, useRouter } from '@nuxtjs/composition-api'
import { toStoreReports, toStoreReportsFromFunctions } from '@/db/reports'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'

const useIndex = () => {
  const router = useRouter()
  const { openSnackbar } = useSnackbar()
  const { reports, resetReports } = useStore()

  /** setUp */
  const ssrSetUp = async (): Promise<void> => {
    if (process.env.NODE_ENV !== 'production') return
    try {
      await toStoreReportsFromFunctions(reports)
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。')
    }
  }

  const isLoadingReports = ref(false)
  const csrSetUp = async (): Promise<void> => {
    try {
      isLoadingReports.value = true
      resetReports()
      await toStoreReports(reports)
      isLoadingReports.value = false
    } catch (error) {
      openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoadingReports.value = false
    }
  }

  /** search dialog */
  const isDialog = ref(false)
  const showDialog = (): void => {
    isDialog.value = true
  }
  const hideDialog = (): void => {
    isDialog.value = false
  }
  const inputCompetitionId = (competitionId: string): void => {
    reports.searchOption.teamId = ''
    reports.searchOption.competitionId = competitionId
  }
  const inputTeamId = (teamId: string): void => {
    reports.searchOption.teamId = teamId
  }
  const inputYearMonth = (yearMonth: string): void => {
    reports.searchOption.yearMonth = yearMonth
  }
  const clearYearMonth = (): void => {
    reports.searchOption.yearMonth = ''
  }
  const pushToReports = (): void => {
    reports.data = []
    reports.hasNext = true
    reports.lastVisible = null
    router.push('/reports')
  }

  const pushToReportSearch = (): void => {
    router.push('/reports/search')
  }

  return {
    clearYearMonth,
    csrSetUp,
    hideDialog,
    inputCompetitionId,
    inputTeamId,
    inputYearMonth,
    isDialog,
    isLoadingReports,
    pushToReports,
    pushToReportSearch,
    showDialog,
    ssrSetUp
  }
}

export default useIndex
