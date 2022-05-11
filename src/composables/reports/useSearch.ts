import { ref } from '@nuxtjs/composition-api'
import { getFirstMatches, getNextMatches } from '@/db/matchesCollection'
import useStore from '@/utils/useStore'

const useSearch = () => {
  const { match } = useStore()
  const isLoadingFirst = ref(false)
  const isLoading = ref(false)

  const getFirstPage = async (): Promise<'success' | 'failure'> => {
    try {
      dialog.value = false
      isLoadingFirst.value = true
      await getFirstMatches(match)
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoadingFirst.value = false
    }
  }

  const getNextPage = async (): Promise<'success' | 'failure'> => {
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
  const showDialog = (): void => {
    dialog.value = true
  }
  const hideDialog = (): void => {
    dialog.value = false
  }

  const inputCompetitionId = (competitionId: string): void => {
    match.searchOption.teamIds = []
    match.searchOption.competitionId = competitionId
  }
  const inputTeamId = (teamId: string): void => {
    match.searchOption.teamIds = []
    match.searchOption.teamIds.push(teamId)
  }
  const inputDate = (date: string): void => {
    match.searchOption.jstDate = date
  }
  const clearDate = (): void => {
    match.searchOption.jstDate = ''
  }

  return {
    isLoadingFirst,
    isLoading,
    getFirstPage,
    getNextPage,
    dialog,
    showDialog,
    hideDialog,
    inputCompetitionId,
    inputTeamId,
    inputDate,
    clearDate
  }
}

export default useSearch
