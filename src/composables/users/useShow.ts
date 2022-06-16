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

  return { user, reports, isLoadingUser, isLoadingReports, setUp }
}

export default useShow
