import { computed, ref } from '@nuxtjs/composition-api'
import { toStoreFirstReports, toStorePopularReports } from '@/db/reports'
import useLoginUser from '@/utils/useLoginUser'
import useStore from '@/utils/useStore'

const useIndex = () => {
  const { loginUser } = useLoginUser()
  const { reports, clearReportSearchOption } = useStore()

  /* setUp */
  const isLoadingReports = ref(false)
  const setUp = async () => {
    try {
      isLoadingReports.value = true
      clearReportSearchOption()
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

  /* searchDialog */
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

  /* tabs */
  const tab = ref('New')
  const tabs = computed(() => {
    return loginUser.value && loginUser.value.team.id
      ? ['New', 'Popular', 'My Team']
      : ['New', 'Popular']
  })
  const changeTab = (index: number): void => {
    tab.value = tabs.value[index]
  }
  const isLoadingChangeReports = ref(false)
  const changeReports = async () => {
    try {
      isLoadingChangeReports.value = true
      if (tab.value === 'New') {
        clearReportSearchOption()
        await toStoreFirstReports(reports)
      } else if (tab.value === 'Popular') {
        clearReportSearchOption()
        await toStorePopularReports(reports)
      } else if (tab.value === 'My Team') {
        reports.searchOption.teamId = loginUser.value?.team.id!
        reports.searchOption.competitionId = loginUser.value?.competitionId!
        reports.searchOption.jstDate = ''
        await toStoreFirstReports(reports)
      }
      return 'success'
    } catch (error) {
      console.log(error)
      return 'failure'
    } finally {
      isLoadingChangeReports.value = false
    }
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
    clearDate,
    tab,
    tabs,
    changeTab,
    isLoadingChangeReports,
    changeReports
  }
}

export default useIndex
