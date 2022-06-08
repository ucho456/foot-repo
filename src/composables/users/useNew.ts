import { reactive, ref } from '@nuxtjs/composition-api'
import { getAuth, getIdTokenResult } from 'firebase/auth'
import { createUser } from '@/db/users'
import useCurrentUser from '@/utils/useCurrentUser'
import uploadAndGetImageUrl from '@/utils/uploadAndGetImageUrl'

const useNew = () => {
  const { setUpCurrentUser } = useCurrentUser()

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
  const setUp = async (): Promise<'success' | 'failure'> => {
    try {
      isLoadingSetUp.value = true
      const auth = getAuth()
      const currentUser = auth.currentUser
      if (currentUser) {
        const idTokenResult = await getIdTokenResult(currentUser)
        const initSetting = idTokenResult.claims.initSetting as unknown as boolean
        if (!initSetting) {
          user.id = currentUser.uid
          user.name = currentUser.displayName ? currentUser.displayName.substring(0, 20) : ''
          user.imageUrl = currentUser.photoURL
        }
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
  const create = async (): Promise<'success' | 'failure' | 'no currentUser'> => {
    try {
      isLoading.value = true
      const imageUrl = userImageFile.value
        ? await uploadAndGetImageUrl(`users/${user.id}`, userImageFile.value)
        : null
      if (imageUrl) {
        user.imageUrl = imageUrl
      }
      await createUser(user)
      setUpCurrentUser(user)
      return 'success'
    } catch (error) {
      console.log(error)
      return error instanceof Error && error.message === 'no currentUser'
        ? 'no currentUser'
        : 'failure'
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
