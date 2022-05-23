import { ref } from '@nuxtjs/composition-api'
import { getFirstMatches, getNextMatches } from '@/db/matches'
import useCurrentUser from '@/utils/useCurrentUser'
import useStore from '@/utils/useStore'

const useSearch = () => {
  const { currentUser } = useCurrentUser()
  const { matches } = useStore()

  const isLoadingSetUp = ref(false)
  const setUp = async (): Promise<'success' | 'failure'> => {
    try {
      isLoadingSetUp.value = true
      if (currentUser.value) {
        matches.searchOption.competitionId = currentUser.value.competitionId
        matches.searchOption.teamId = currentUser.value.teamId
      }
      matches.searchOption.status = 'FINISHED'
      await getFirstMatches(matches)
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
      await getNextMatches(matches)
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
      await getFirstMatches(matches)
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
    matches.searchOption.teamId = ''
    matches.searchOption.competitionId = competitionId
  }
  const inputTeamId = (teamId: string): void => {
    matches.searchOption.teamId = teamId
  }
  const inputDate = (date: string): void => {
    matches.searchOption.jstDate = date
  }
  const clearDate = (): void => {
    matches.searchOption.jstDate = ''
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
