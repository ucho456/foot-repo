/** check */
import { ref } from '@nuxtjs/composition-api'
import { toStoreReports } from '@/db/reports'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'

const useIndex = () => {
  const { openSnackbar } = useSnackbar()
  const { reports, resetReports } = useStore()

  /** setUp */
  const isLoadingFirst = ref(false)
  const setUp = async () => {
    try {
      isLoadingFirst.value = true
      console.log(reports.searchOption)
      if (reports.data.length === 0) await toStoreReports(reports)
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '選手採点の取得に失敗しました。')
    } finally {
      isLoadingFirst.value = false
    }
  }

  /** next reports */
  const isLoadingNext = ref(false)
  const readNextReports = async (): Promise<void> => {
    try {
      isLoadingNext.value = true
      await toStoreReports(reports)
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '選手採点の取得に失敗しました。')
    } finally {
      isLoadingNext.value = false
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
  const inputYearMonth = (date: string): void => {
    reports.searchOption.yearMonth = date
  }
  const clearYearMonth = (): void => {
    reports.searchOption.yearMonth = ''
  }
  const search = async (): Promise<void> => {
    try {
      hideDialog()
      isLoadingFirst.value = true
      resetReports()
      await toStoreReports(reports)
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '選手採点の取得に失敗しました。')
    } finally {
      isLoadingFirst.value = false
    }
  }

  return {
    clearYearMonth,
    hideDialog,
    inputCompetitionId,
    inputTeamId,
    inputYearMonth,
    isDialog,
    isLoadingFirst,
    isLoadingNext,
    readNextReports,
    search,
    setUp,
    showDialog
  }
}

export default useIndex
