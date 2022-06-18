import { ref } from '@nuxtjs/composition-api'
import { toStoreFirstReports, toStoreNextReports } from '@/db/reports'
import useStore from '@/utils/useStore'

const useIndex = () => {
  const { reports } = useStore()

  const isLoadingFirst = ref(false)
  const setUp = async () => {
    try {
      isLoadingFirst.value = true
      await toStoreFirstReports(reports)
      return 'success'
    } catch (error) {
      console.log(error)
      return 'failure'
    } finally {
      isLoadingFirst.value = false
    }
  }

  const isLoadingNext = ref(false)
  const hasNextPage = ref(true)
  const readMore = async (): Promise<'success' | 'failure'> => {
    try {
      isLoadingNext.value = true
      await toStoreNextReports(reports, hasNextPage)
      return 'success'
    } catch (error) {
      console.log(error)
      return 'failure'
    } finally {
      isLoadingNext.value = false
    }
  }

  const search = async (): Promise<'success' | 'failure'> => {
    try {
      hideDialog()
      hasNextPage.value = true
      isLoadingFirst.value = true
      await toStoreFirstReports(reports)
      return 'success'
    } catch (error) {
      console.log(error)
      return 'failure'
    } finally {
      isLoadingFirst.value = false
    }
  }

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

  return {
    isLoadingFirst,
    setUp,
    isLoadingNext,
    hasNextPage,
    readMore,
    search,
    isDialog,
    showDialog,
    hideDialog,
    inputCompetitionId,
    inputTeamId,
    inputDate,
    clearDate
  }
}

export default useIndex
