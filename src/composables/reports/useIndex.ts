import { ref } from '@nuxtjs/composition-api'
import { toStoreFirstReports } from '@/db/reports'
import useStore from '@/utils/useStore'

const useIndex = () => {
  const { reports } = useStore()

  const isLoading = ref(false)
  const setUp = async () => {
    try {
      isLoading.value = true
      await toStoreFirstReports(reports)
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoading.value = false
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
    isLoading,
    setUp,
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
