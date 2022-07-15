/** check */
import { reactive, ref, useRouter } from '@nuxtjs/composition-api'
import { getAuth, getIdTokenResult } from 'firebase/auth'
import { postUser } from '@/db/users'
import { teamMap } from '@/db/teams'
import uploadAndGetImageUrl from '@/utils/uploadAndGetImageUrl'
import useLoginUser from '@/utils/useLoginUser'
import useSnackbar from '@/utils/useSnackbar'

const useNew = () => {
  const router = useRouter()
  const { setUpLoginUser } = useLoginUser()
  const { openSnackbar } = useSnackbar()

  const newUser: InputUser = reactive({
    id: '',
    name: '',
    imageUrl: null,
    greet: '',
    competitionId: '',
    team: { id: '', name: '' }
  })

  const isLoadingSetUp = ref(false)
  const setUp = async (): Promise<void> => {
    try {
      isLoadingSetUp.value = true
      const auth = getAuth()
      const currentUser = auth.currentUser
      if (!currentUser) throw new Error('unauthorized access')
      const idTokenResult = await getIdTokenResult(currentUser)
      if (!idTokenResult) throw new Error('unauthorized access')
      const initSetting = idTokenResult.claims.initSetting as unknown as boolean
      if (!initSetting) {
        newUser.id = currentUser.uid
        newUser.name = currentUser.displayName ? currentUser.displayName.substring(0, 20) : ''
        newUser.imageUrl = currentUser.photoURL
      } else {
        throw new Error('unauthorized access')
      }
    } catch (error) {
      console.log(error)
      if (error instanceof Error && error.message.includes('unauthorized access')) {
        openSnackbar('failure', '不正なアクセスが発生しました。')
        router.push('/')
      } else {
        openSnackbar('failure', '通信エラーが発生しました。')
      }
    } finally {
      isLoadingSetUp.value = false
    }
  }

  const changeImageUrl = (image: string): void => {
    newUser.imageUrl = image
  }
  const clearImageUrl = (): void => {
    newUser.imageUrl = null
  }
  const inputCompetitionId = (competitionId: string): void => {
    newUser.competitionId = competitionId
    newUser.team.id = ''
  }

  const isLoadingCreate = ref(false)
  const createUser = async (): Promise<void> => {
    try {
      isLoadingCreate.value = true
      if (newUser.team.id) newUser.team.name = teamMap.get(newUser.team.id)?.name!
      const imageUrl = newUser.imageUrl
        ? await uploadAndGetImageUrl(`users/${newUser.id}`, newUser.imageUrl)
        : null
      if (imageUrl) newUser.imageUrl = imageUrl
      postUser(newUser)
      setUpLoginUser(newUser)
      openSnackbar('success', 'プロフィールを作成しました。')
      router.push('/')
    } catch (error) {
      console.log(error)
      openSnackbar('failure', 'プロフィールの作成に失敗しました。')
    } finally {
      isLoadingCreate.value = false
    }
  }

  return {
    changeImageUrl,
    clearImageUrl,
    createUser,
    inputCompetitionId,
    isLoadingCreate,
    isLoadingSetUp,
    newUser,
    setUp
  }
}

export default useNew
