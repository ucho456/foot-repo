import { ref, Ref } from '@nuxtjs/composition-api'
import { fetchUser } from '@/db/users'

const useShow = () => {
  const user: Ref<User | null> = ref(null)

  const isLoading = ref(false)
  const setUp = async (userId: string): Promise<'success' | 'failure'> => {
    try {
      isLoading.value = true
      user.value = await fetchUser(userId)
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  return { user, isLoading, setUp }
}

export default useShow
