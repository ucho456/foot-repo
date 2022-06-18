import { ref } from '@nuxtjs/composition-api'
import { toStoreFirstReports } from '@/db/reports'
import useStore from '@/utils/useStore'

const useIndex = () => {
  const { reports } = useStore()

  const isLoadingReports = ref(false)
  const setUp = async () => {
    try {
      isLoadingReports.value = true
      await toStoreFirstReports(reports)
      isLoadingReports.value = false

      return 'success'
    } catch (error) {
      console.log(error)
      return 'failure'
    } finally {
      isLoadingReports.value = false
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
    isLoadingReports,
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
