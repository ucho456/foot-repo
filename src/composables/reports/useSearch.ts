import { ref } from '@nuxtjs/composition-api'
import { getFirstMatches, getNextMatches } from '@/db/matchesCollection'
import useStore from '@/utils/useStore'
const useSearch = () => {
  const { match } = useStore()
  const isLoadingFirst = ref(false)
  const isLoading = ref(false)

  const getFirstPage = async (): Promise<'success' | 'failure'> => {
    try {
      isLoadingFirst.value = true
      await getFirstMatches(match)
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
      await getNextMatches(match)
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

  const inputDate = (date: string) => (match.searchOption.jstDate = date)

  return {
    isLoadingFirst,
    isLoading,
    getFirstPage,
    getNextPage,
    dialog,
    showDialog,
    hideDialog,
    inputDate
  }
}

export default useSearch
