import { ref, Ref } from '@nuxtjs/composition-api'
import { fetchUserLikeReports, fetchUserReports, deleteReport } from '@/db/reports'
import { fetchUser } from '@/db/users'

const useShow = () => {
  const user: Ref<User | null> = ref(null)
  const reports: Ref<Report[]> = ref([])

  const isLoadingUser = ref(false)
  const isLoadingReports = ref(false)
  const setUp = async (userId: string): Promise<'success' | 'failure'> => {
    try {
      isLoadingUser.value = true
      user.value = await fetchUser(userId)
      isLoadingUser.value = false

      isLoadingReports.value = true
      reports.value = await fetchUserReports(userId)
      isLoadingReports.value = false

      return 'success'
    } catch (error) {
      console.log(error)
      return 'failure'
    } finally {
      isLoadingUser.value = false
      isLoadingReports.value = false
    }
  }

  const tab = ref('Mine')
  const tabs = ['Mine', 'Like']
  const changeTab = (index: number): void => {
    tab.value = tabs[index]
  }
  const isLoadingChangeReports = ref(false)
  const changeReports = async (): Promise<'success' | 'failure'> => {
    try {
      isLoadingChangeReports.value = true
      reports.value =
        tab.value === 'Mine'
          ? await fetchUserReports(user.value?.id!)
          : await fetchUserLikeReports(user.value?.id!)
      return 'success'
    } catch (error) {
      console.log(error)
      return 'failure'
    } finally {
      isLoadingChangeReports.value = false
    }
  }

  const isDialogDelete = ref(false)
  const targetReport: Ref<Report | null> = ref(null)
  const showDeletePopup = (report: Report): void => {
    isDialogDelete.value = true
    targetReport.value = report
  }
  const hideDeletePopup = (): void => {
    isDialogDelete.value = false
    targetReport.value = null
  }
  const isLoadingDel = ref(false)
  const del = async (): Promise<'success' | 'failure'> => {
    try {
      isLoadingDel.value = true
      await deleteReport(targetReport.value?.id!)
      reports.value = reports.value.filter((r) => r.id !== targetReport.value?.id!)
      return 'success'
    } catch (error) {
      console.log(error)
      return 'failure'
    } finally {
      hideDeletePopup()
      isLoadingDel.value = false
    }
  }

  return {
    user,
    reports,
    isLoadingUser,
    isLoadingReports,
    setUp,
    isDialogDelete,
    targetReport,
    showDeletePopup,
    hideDeletePopup,
    isLoadingDel,
    del,
    tabs,
    isLoadingChangeReports,
    changeReports,
    tab,
    changeTab
  }
}

export default useShow
