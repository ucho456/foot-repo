import { ref } from '@nuxtjs/composition-api'
import { getFirstMatches, getNextMatches } from '@/db/matchesCollection'
import useCurrentUser from '@/utils/useCurrentUser'
import useStore from '@/utils/useStore'

const useSearch = () => {
  const { currentUser } = useCurrentUser()
  const { match } = useStore()

  const isLoadingSetUp = ref(false)
  const setUp = async (): Promise<'success' | 'failure'> => {
    try {
      isLoadingSetUp.value = true
      if (currentUser.value && currentUser.value.teamId !== '') {
        match.searchOption.teamIds.push(currentUser.value.teamId)
      }
      match.searchOption.status = 'FINISHED'
      await getFirstMatches(match)
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoadingSetUp.value = false
    }
  }

  const isLoading = ref(false)
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

  const search = async (): Promise<'success' | 'failure'> => {
    try {
      dialog.value = false
      isLoading.value = true
      await getFirstMatches(match)
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
    isLoadingSetUp,
    setUp,
    isLoading,
    getNextPage,
    search,
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
