import { ref, Ref } from '@nuxtjs/composition-api'
import { fetchUserReports } from '@/db/reports'
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
  const deleteReport: Ref<Report | null> = ref(null)
  const showDeletePopup = (report: Report): void => {
    isDialogDelete.value = true
    deleteReport.value = report
  }
  const hideDeletePopup = (): void => {
    isDialogDelete.value = false
    deleteReport.value = null
  }

  return {
    user,
    reports,
    isLoadingUser,
    isLoadingReports,
    setUp,
    isDialogDelete,
    deleteReport,
    showDeletePopup,
    hideDeletePopup
  }
}

export default useShow
