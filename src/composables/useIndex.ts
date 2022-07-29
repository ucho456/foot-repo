/** check */
import { ref, useRouter } from '@nuxtjs/composition-api'
import { toStoreReports } from '@/db/reports'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'

const useIndex = () => {
  const router = useRouter()
  const { openSnackbar } = useSnackbar()
  const { reports, resetReports } = useStore()

  /** setUp */
  const isLoadingReports = ref(false)
  const setUp = async (): Promise<void> => {
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
    hideDialog,
    inputCompetitionId,
    inputTeamId,
    inputYearMonth,
    isDialog,
    isLoadingReports,
    pushToReports,
    pushToReportSearch,
    setUp,
    showDialog
  }
}

export default useIndex
