import { ref } from '@nuxtjs/composition-api'
import { toStoreFirstReports, toStoreNextReports } from '@/db/reports'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'

const useIndex = () => {
  const { openSnackbar } = useSnackbar()
  const { reports } = useStore()

  /** setUp */
  const isLoadingFirst = ref(false)
  const hasNextReports = ref(true)
  const setUp = async () => {
    try {
      isLoadingFirst.value = true
      await toStoreFirstReports(reports, hasNextReports)
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
      await toStoreNextReports(reports, hasNextReports)
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
  const inputDate = (date: string): void => {
    reports.searchOption.jstDate = date
  }
  const clearDate = (): void => {
    reports.searchOption.jstDate = ''
  }
  const search = async (): Promise<void> => {
    try {
      hideDialog()
      hasNextReports.value = true
      isLoadingFirst.value = true
      reports.data = []
      await toStoreFirstReports(reports)
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '選手採点の取得に失敗しました。')
    } finally {
      isLoadingFirst.value = false
    }
  }

  return {
    clearDate,
    hasNextReports,
    hideDialog,
    inputCompetitionId,
    inputDate,
    inputTeamId,
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
