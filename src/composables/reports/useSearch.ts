import { ref } from '@nuxtjs/composition-api'
import { toStoreFirstMatches, toStoreNextMatches } from '@/db/matches'
import useCurrentUser from '@/utils/useCurrentUser'
import useStore from '@/utils/useStore'

const useSearch = () => {
  const { currentUser } = useCurrentUser()
  const { matches } = useStore()

  const isLoadingFirst = ref(false)
  const setUp = async (): Promise<'success' | 'failure'> => {
    try {
      isLoadingFirst.value = true
      matches.lastVisible = null
      matches.searchOption.jstDate = ''
      if (currentUser.value) {
        matches.searchOption.competitionId = currentUser.value.competitionId
        matches.searchOption.teamId = currentUser.value.teamId
      }
      await toStoreFirstMatches(matches)
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoadingFirst.value = false
    }
  }

  const isLoadingNext = ref(false)
  const readMore = async (): Promise<'success' | 'failure'> => {
    try {
      isLoadingNext.value = true
      await toStoreNextMatches(matches)
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoadingNext.value = false
    }
  }

  const search = async (): Promise<'success' | 'failure'> => {
    try {
      hideDialog()
      isLoadingFirst.value = true
      await toStoreFirstMatches(matches)
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoadingFirst.value = false
    }
  }

  const isDialog = ref(false)
  const showDialog = (): void => {
    isDialog.value = true
  }
  const hideDialog = (): void => {
    isDialog.value = false
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
    isLoadingFirst,
    setUp,
    isLoadingNext,
    readMore,
    search,
    isDialog,
    showDialog,
    hideDialog,
    inputCompetitionId,
    inputTeamId,
    inputDate,
    clearDate
  }
}

export default useSearch
