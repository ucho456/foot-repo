import { computed, ref, watch } from '@nuxtjs/composition-api'
import { toStoreFirstReports } from '@/db/reports'
import useLoginUser from '@/utils/useLoginUser'
import useStore from '@/utils/useStore'

const useIndex = () => {
  const { loginUser } = useLoginUser()
  const { reports } = useStore()

  /* setUp */
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
    return loginUser.value ? ['New', 'Popular', 'My Team'] : ['New', 'Popular']
  })
  const changeTab = (index: number): void => {
    tab.value = tabs.value[index]
  }
  watch(tab, () => {
    console.log('watch tab value', tab.value)
  })

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
    tabs,
    changeTab
  }
}

export default useIndex
