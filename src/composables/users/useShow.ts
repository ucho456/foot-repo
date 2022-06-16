import { ref, Ref } from '@nuxtjs/composition-api'
import { fetchUser } from '@/db/users'

const useShow = () => {
  const user: Ref<User | null> = ref(null)

  const isLoadingUser = ref(false)
  const setUp = async (userId: string): Promise<'success' | 'failure'> => {
    try {
      isLoadingUser.value = true
      user.value = await fetchUser(userId)
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoadingUser.value = false
    }
  }

  return { user, isLoadingUser, setUp }
}

export default useShow
