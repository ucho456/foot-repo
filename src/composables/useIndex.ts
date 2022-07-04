import { computed, ref, useRouter, watch } from '@nuxtjs/composition-api'
import { toStoreFirstReports, toStorePopularReports } from '@/db/reports'
import useLoginUser from '@/utils/useLoginUser'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'

const useIndex = () => {
  const router = useRouter()
  const { loginUser } = useLoginUser()
  const { openSnackbar } = useSnackbar()
  const { reports, clearReportSearchOption } = useStore()

  /** setUp */
  const isLoadingReports = ref(false)
  const setUp = async (): Promise<void> => {
    try {
      isLoadingReports.value = true
      clearReportSearchOption()
      await toStoreFirstReports(reports)
      isLoadingReports.value = false
    } catch (error) {
      openSnackbar('failure', '選手採点の取得に失敗しました。')
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
  const inputDate = (date: string): void => {
    reports.searchOption.jstDate = date
  }
  const clearDate = (): void => {
    reports.searchOption.jstDate = ''
  }
  const pushToReports = (): void => {
    router.push('/reports')
  }

  /** reports tab */
  const tab = ref('New')
  const tabs = computed(() => {
    return loginUser.value && loginUser.value.team.id
      ? ['New', 'Popular', 'My Team']
      : ['New', 'Popular']
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
        clearReportSearchOption()
        await toStoreFirstReports(reports)
      } else if (tab.value === 'Popular') {
        clearReportSearchOption()
        await toStorePopularReports(reports)
      } else if (tab.value === 'My Team') {
        reports.data = []
        reports.searchOption.teamId = loginUser.value?.team.id!
        reports.searchOption.competitionId = loginUser.value?.competitionId!
        reports.searchOption.jstDate = ''
        await toStoreFirstReports(reports)
      }
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '選手採点の取得に失敗しました。')
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
    tabs,
    changeTab,
    isLoadingChangeReports,
    pushToReports
  }
}

export default useIndex
