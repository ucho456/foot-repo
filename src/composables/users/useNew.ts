import { reactive, ref } from '@nuxtjs/composition-api'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createUser, uploadAndGetImageUrl } from '@/db/users'
import useCurrentUser from '@/utils/useCurrentUser'

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
      await new Promise((resolve) => {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
          if (authUser) {
            const idTokenResult = await authUser.getIdTokenResult(true)
            if (idTokenResult.claims.initSetting) {
              throw new Error('unauthorized access')
            } else {
              user.id = authUser.uid
              user.name = authUser.displayName ? authUser.displayName.substring(0, 20) : ''
              user.imageUrl = authUser.photoURL
            }
          }
        })
        resolve(unsubscribe)
      })
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
      const imageUrl = userImageFile.value ? await uploadAndGetImageUrl(userImageFile.value) : null
      if (imageUrl) user.imageUrl = imageUrl
      await createUser(user)
      setUpCurrentUser()
      return 'success'
    } catch {
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
