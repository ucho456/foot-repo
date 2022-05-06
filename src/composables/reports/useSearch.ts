import { ref, Ref } from '@nuxtjs/composition-api'
import type { QueryDocumentSnapshot } from 'firebase/firestore'
import { getFirstMatches, getNextMatches } from '@/db/matchesCollection'
import { Match } from '@/types/matches'

const useSearch = () => {
  const matches: Ref<Match[]> = ref([])
  const lastVisible: Ref<QueryDocumentSnapshot<Match> | null> = ref(null)
  const isLoadingFirst = ref(false)
  const isLoading = ref(false)

  const getFirstPage = async (): Promise<'success' | 'failure'> => {
    try {
      isLoadingFirst.value = true
      matches.value = []
      await getFirstMatches(matches, lastVisible)
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoadingFirst.value = false
    }
  }

  const getNextPage = async () => {
    try {
      isLoading.value = true
      await getNextMatches(matches, lastVisible)
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  return { matches, isLoadingFirst, isLoading, getFirstPage, getNextPage }
}

export default useSearch
