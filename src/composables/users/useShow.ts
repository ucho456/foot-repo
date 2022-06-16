import { ref, Ref } from '@nuxtjs/composition-api'
import { fetchUserReports, deleteReport } from '@/db/reports'
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
    } catch {
      return 'failure'
    } finally {
      isLoadingUser.value = false
      isLoadingReports.value = false
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
    } catch {
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
    del
  }
}

export default useShow
