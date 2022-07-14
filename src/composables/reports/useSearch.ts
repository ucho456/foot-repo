/** check */
import { ref, useRouter } from '@nuxtjs/composition-api'
import { toStoreMatches } from '@/db/matches'
import useLoginUser from '@/utils/useLoginUser'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'

const useSearch = () => {
  const router = useRouter()
  const { loginUser } = useLoginUser()
  const { openSnackbar } = useSnackbar()
  const { confirmation, matches, resetMatches } = useStore()

  /** confirm login */
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

  /** setUp */
  const isLoadingFirst = ref(false)
  const setUp = async (): Promise<void> => {
    try {
      isLoadingFirst.value = true
      if (matches.data.length === 0) {
        resetMatches()
        await toStoreMatches(matches)
      }
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '試合データの取得に失敗しました。')
    } finally {
      isLoadingFirst.value = false
    }
  }

  /** next matches */
  const isLoadingNext = ref(false)
  const readNextMatches = async (): Promise<void> => {
    try {
      isLoadingNext.value = true
      await toStoreMatches(matches)
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '試合データの取得に失敗しました。')
    } finally {
      isLoadingNext.value = false
    }
  }

  /** search dialog */
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
  const inputYearMonth = (yearMonth: string): void => {
    matches.searchOption.yearMonth = yearMonth
  }
  const clearYearMonth = (): void => {
    matches.searchOption.yearMonth = ''
  }
  const search = async (): Promise<void> => {
    try {
      hideDialog()
      matches.data = []
      matches.lastVisible = null
      matches.hasNext = true
      isLoadingFirst.value = true
      await toStoreMatches(matches)
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '試合データの取得に失敗しました。')
    } finally {
      isLoadingFirst.value = false
    }
  }

  const pushToPromptUpdate = (): void => {
    router.push('/reports/prompt-update')
  }

  return {
    clearYearMonth,
    confirmLogin,
    continueGuest,
    hideDialog,
    inputCompetitionId,
    inputTeamId,
    inputYearMonth,
    isDialog,
    isDialogConfirmLogin,
    isLoadingFirst,
    isLoadingNext,
    pushToPromptUpdate,
    readNextMatches,
    search,
    setUp,
    showDialog
  }
}

export default useSearch
