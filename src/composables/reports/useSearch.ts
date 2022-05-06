import { ref, Ref } from '@nuxtjs/composition-api'
import { getMatches } from '@/db/matchesCollection'
import { Match } from '@/types/matches'

const useSearch = () => {
  const matches: Ref<Match[]> = ref([])

  const get = async () => {
    try {
      await getMatches(matches)
    } catch {
      return null
    }
  }

  return { matches, get }
}

export default useSearch
