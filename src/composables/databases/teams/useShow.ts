import { ref } from '@nuxtjs/composition-api'
import { setTeam } from '@/db/teams'

const useShow = () => {
  const isLoading = ref(false)
  const setUp = async (teamId: string): Promise<'success' | 'failure'> => {
    try {
      isLoading.value = true
      await setTeam(teamId)
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  return { isLoading, setUp }
}

export default useShow
