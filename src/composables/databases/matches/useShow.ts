import { ref } from '@nuxtjs/composition-api'
import useStore from '@/utils/useStore'
import { toStoreMatch } from '@/db/matches'

const useShow = () => {
  const { match } = useStore()

  const isLoadingMatch = ref(false)
  const setUp = async (matchId: string): Promise<'success' | 'failure'> => {
    try {
      isLoadingMatch.value = true
      await toStoreMatch(matchId, match)
      isLoadingMatch.value = false

      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoadingMatch.value = false
    }
  }

  return { setUp }
}

export default useShow
