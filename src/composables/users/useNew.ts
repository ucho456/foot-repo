import { reactive, ref } from '@nuxtjs/composition-api'
import { getAuth, getIdTokenResult } from 'firebase/auth'
import { createUser } from '@/db/users'
import useLoginUser from '@/utils/useLoginUser'
import uploadAndGetImageUrl from '@/utils/uploadAndGetImageUrl'

const useNew = () => {
  const { setUpLoginUser } = useLoginUser()

  const user: User = reactive({
    id: '',
    name: '',
    imageUrl: null,
    greet: '',
    competitionId: '',
    teamId: ''
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
        user.id = currentUser.uid
        user.name = currentUser.displayName ? currentUser.displayName.substring(0, 20) : ''
        user.imageUrl = currentUser.photoURL
      } else {
        return 'unauthorized access'
      }
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoadingSetUp.value = false
    }
  }

  const changeImageUrl = (imageFile: File): void => {
    user.imageUrl = URL.createObjectURL(imageFile)
    userImageFile.value = imageFile
  }

  const clearImageUrl = (): void => {
    user.imageUrl = null
    userImageFile.value = null
  }

  const isLoading = ref(false)
  const create = async (): Promise<'success' | 'failure'> => {
    try {
      isLoading.value = true
      const imageUrl = userImageFile.value
        ? await uploadAndGetImageUrl(`users/${user.id}`, userImageFile.value)
        : null
      if (imageUrl) {
        user.imageUrl = imageUrl
      }
      await createUser(user)
      setUpLoginUser(user)
      return 'success'
    } catch (error) {
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    isLoadingSetUp,
    setUp,
    changeImageUrl,
    clearImageUrl,
    isLoading,
    create
  }
}

export default useNew
