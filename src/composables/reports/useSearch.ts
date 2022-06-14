import { ref } from '@nuxtjs/composition-api'
import { toStoreFirstMatches, toStoreNextMatches } from '@/db/matches'
import useLoginUser from '@/utils/useLoginUser'
import useStore from '@/utils/useStore'

const useSearch = () => {
  const { loginUser } = useLoginUser()
  const { matches, confirmation } = useStore()

  const isDialogConfirmLogin = ref(false)
  const confirmLogin = (): void => {
    if (!confirmation.isLogin && !loginUser.value) {
      isDialogConfirmLogin.value = true
    } else {
      confirmation.isLogin = true
    }
  }
  const continueGuest = (): void => {
    confirmation.isLogin = true
    isDialogConfirmLogin.value = false
  }

  const isLoadingFirst = ref(false)
  const setUp = async (): Promise<'success' | 'failure'> => {
    try {
      isLoadingFirst.value = true
      matches.lastVisible = null
      matches.searchOption.jstDate = ''
      if (loginUser.value) {
        matches.searchOption.competitionId = loginUser.value.competitionId
        matches.searchOption.teamId = loginUser.value.teamId
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
    isDialogConfirmLogin,
    confirmLogin,
    continueGuest,
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
