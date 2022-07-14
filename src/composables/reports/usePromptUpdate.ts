import { ref, useRouter } from '@nuxtjs/composition-api'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { fetchUpdateCandidateMatches } from '@/db/matches'
import useLoginUser from '@/utils/useLoginUser'
import useSnackbar from '@/utils/useSnackbar'

const usePromptUpdate = () => {
  const router = useRouter()
  const { loginUser } = useLoginUser()
  const { openSnackbar } = useSnackbar()

  /** setUp */
  const matches = ref<Match[]>([])
  const isLoadingSetUp = ref(false)
  const setUp = async (): Promise<void> => {
    if (!loginUser.value) throw new Error('unauthorized access')
    try {
      isLoadingSetUp.value = true
      matches.value = await fetchUpdateCandidateMatches()
    } catch (error) {
      console.log(error)
      if (error instanceof Error && error.message === 'unauthorized access') {
        openSnackbar('failure', '不正なアクセスが発生しました。')
        router.push('/')
      } else {
        openSnackbar('failure', '試合データの取得に失敗しました。通信状況をお確かめ下さい。')
      }
    } finally {
      isLoadingSetUp.value = false
    }
  }

  /** prompt update match */
  const isLoadingUpdate = ref(false)
  const promptUpdateMatch = async (matchId: string) => {
    try {
      isLoadingUpdate.value = true
      const functions = getFunctions(undefined, 'asia-northeast1')
      const promptUpdateMatch = httpsCallable(functions, 'promptUpdateMatch')
      const res = await promptUpdateMatch({ matchId })
      const message = res.data as 'success' | 'already updated' | 'not yet' | 'failure'
      if (message === 'success' || message === 'already updated') {
        openSnackbar('success', '試合データを更新しました。選手採点の作成をご利用下さい。')
        router.push({ path: '/reports/new', query: { matchId } })
      } else if (message === 'not yet') {
        openSnackbar(
          'failure',
          '試合データを更新できませんでした。暫くお待ち頂いてからご利用下さい。'
        )
      } else if (message === 'failure') {
        throw new Error('error')
      }
    } catch (error) {
      error instanceof Error && error.message === 'failure'
        ? openSnackbar('failure', '不正なアクセスが発生しました。')
        : openSnackbar('failure', '通信エラーが発生しました。通信状況をお確かめ下さい。')
    } finally {
      isLoadingUpdate.value = false
    }
  }

  return {
    isLoadingSetUp,
    isLoadingUpdate,
    matches,
    promptUpdateMatch,
    setUp
  }
}

export default usePromptUpdate
