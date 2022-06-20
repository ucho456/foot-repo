import { reactive, ref } from '@nuxtjs/composition-api'
import { getAuth, getIdTokenResult } from 'firebase/auth'
import { createUser } from '@/db/users'
import { teamMap } from '@/utils/selectTeams'
import uploadAndGetImageUrl from '@/utils/uploadAndGetImageUrl'
import useLoginUser from '@/utils/useLoginUser'

const useNew = () => {
  const { setUpLoginUser } = useLoginUser()

  const inputUser: InputUser = reactive({
    id: '',
    name: '',
    imageUrl: null,
    greet: '',
    competitionId: '',
    team: { id: '', name: '' }
  })
  const userImageFile = ref<File | null>(null)

  const isLoadingSetUp = ref(false)
  const setUp = async (): Promise<'success' | 'failure' | 'unauthorized access'> => {
    try {
      isLoadingSetUp.value = true
      const auth = getAuth()
      const currentUser = auth.currentUser!
      const idTokenResult = await getIdTokenResult(currentUser)
      const initSetting = idTokenResult.claims.initSetting as unknown as boolean
      if (!initSetting) {
        inputUser.id = currentUser.uid
        inputUser.name = currentUser.displayName ? currentUser.displayName.substring(0, 20) : ''
        inputUser.imageUrl = currentUser.photoURL
      } else {
        return 'unauthorized access'
      }
      return 'success'
    } catch (error) {
      console.log(error)
      return 'failure'
    } finally {
      isLoadingSetUp.value = false
    }
  }

  const changeImageUrl = (imageFile: File): void => {
    inputUser.imageUrl = URL.createObjectURL(imageFile)
    userImageFile.value = imageFile
  }

  const clearImageUrl = (): void => {
    inputUser.imageUrl = null
    userImageFile.value = null
  }

  const isLoadingSubmit = ref(false)
  const create = async (): Promise<'success' | 'failure'> => {
    try {
      isLoadingSubmit.value = true
      inputUser.team.name = teamMap.get(inputUser.team.id)?.name!
      const imageUrl = userImageFile.value
        ? await uploadAndGetImageUrl(`users/${inputUser.id}`, userImageFile.value)
        : null
      if (imageUrl) {
        inputUser.imageUrl = imageUrl
      }
      await createUser(inputUser)
      setUpLoginUser(inputUser)
      return 'success'
    } catch (error) {
      console.log(error)
      return 'failure'
    } finally {
      isLoadingSubmit.value = false
    }
  }

  return {
    inputUser,
    isLoadingSetUp,
    setUp,
    changeImageUrl,
    clearImageUrl,
    isLoadingSubmit,
    create
  }
}

export default useNew
