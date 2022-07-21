/** check */
import { computed, ref, useRouter, watch } from '@nuxtjs/composition-api'
import { toStoreReports, toStorePopularReports } from '@/db/reports'
import useLoginUser from '@/utils/useLoginUser'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'

const useIndex = () => {
  const router = useRouter()
  const { loginUser } = useLoginUser()
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

  /** reports tab */
  const tab = ref('New')
  const tabs = computed(() => {
    return loginUser.value && loginUser.value.team.id
      ? ['New', 'Top 10', 'My Team']
      : ['New', 'Top 10']
  })
  const changeTab = (index: number): void => {
    tab.value = tabs.value[index]
  }
  watch(tab, () => changeReports())
  const isLoadingChangeReports = ref(false)
  const changeReports = async (): Promise<void> => {
    try {
      isLoadingChangeReports.value = true
      if (tab.value === 'New') {
        resetReports()
        await toStoreReports(reports)
      } else if (tab.value === 'Top 10') {
        resetReports()
        await toStorePopularReports(reports)
      } else if (tab.value === 'My Team' && loginUser.value) {
        resetReports()
        reports.searchOption.teamId = loginUser.value.team.id
        reports.searchOption.competitionId = loginUser.value.competitionId
        await toStoreReports(reports)
      }
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoadingChangeReports.value = false
    }
  }

  return {
    changeTab,
    clearYearMonth,
    hideDialog,
    inputCompetitionId,
    inputTeamId,
    inputYearMonth,
    isDialog,
    isLoadingChangeReports,
    isLoadingReports,
    pushToReports,
    setUp,
    showDialog,
    tabs
  }
}

export default useIndex
