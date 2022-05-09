import { reactive, ref, Ref } from '@nuxtjs/composition-api'
import type { QueryDocumentSnapshot } from 'firebase/firestore'
import { getFirstMatches, getNextMatches } from '@/db/matchesCollection'
import { Match } from '@/types/matches'

const useSearch = () => {
  const matches: Ref<Match[]> = ref([])
  const lastVisible: Ref<QueryDocumentSnapshot<Match> | null> = ref(null)
  const searchOption = reactive({
    status: 'FINISHED',
    competitionId: '2119',
    teamId: '',
    jstDate: ''
  })
  const isLoadingFirst = ref(false)
  const isLoading = ref(false)

  const getFirstPage = async (): Promise<'success' | 'failure'> => {
    try {
      isLoadingFirst.value = true
      matches.value = []
      await getFirstMatches(matches, lastVisible, searchOption)
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
      await getNextMatches(matches, lastVisible, searchOption)
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  const dialog = ref(false)
  const showDialog = (): boolean => (dialog.value = true)
  const hideDialog = (): boolean => (dialog.value = false)

  return {
    matches,
    searchOption,
    isLoadingFirst,
    isLoading,
    getFirstPage,
    getNextPage,
    dialog,
    showDialog,
    hideDialog
  }
}

export default useSearch
