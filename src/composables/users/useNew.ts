import { reactive, ref } from '@nuxtjs/composition-api'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createUser, uploadAndGetImageUrl } from '@/db/usersCollection'

const useNew = () => {
  const isNormalAccess = ref(true)
  const user: User = reactive({
    id: '',
    name: '',
    imageUrl: null,
    greet: '',
    competitionId1: '',
    teamId1: '',
    competitionId2: '',
    teamId2: '',
    competitionId3: '',
    teamId3: ''
  })
  const userImageFile = ref<File | null>(null)

  const setUpUser = async (): Promise<void> => {
    const auth = getAuth()
    await onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const idTokenResult = await authUser.getIdTokenResult(true)
        if (idTokenResult.claims.initSetting) {
          isNormalAccess.value = false
        } else {
          user.id = authUser.uid
          user.name = authUser.displayName ? authUser.displayName.substring(0, 20) : ''
          user.imageUrl = authUser.photoURL
        }
      }
    })
  }

  const changeImageUrl = (imageFile: File): void => {
    user.imageUrl = URL.createObjectURL(imageFile)
    userImageFile.value = imageFile
  }

  const clearImageUrl = (): void => {
    user.imageUrl = null
    userImageFile.value = null
  }

  const inputCompetitionId = (id: string, num: number): void => {
    const competitionId =
      num === 1 ? 'competitionId1' : num === 2 ? 'competitionId2' : 'competitionId3'
    const teamId = num === 1 ? 'teamId1' : num === 2 ? 'teamId2' : 'teamId3'
    user[competitionId] = id
    user[teamId] = ''
  }

  const isLoading = ref(false)
  const create = async (): Promise<'success' | 'failure'> => {
    try {
      isLoading.value = true
      const imageUrl = userImageFile.value ? await uploadAndGetImageUrl(userImageFile.value) : null
      if (imageUrl) user.imageUrl = imageUrl
      await createUser(user)
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  return {
    isNormalAccess,
    user,
    setUpUser,
    changeImageUrl,
    clearImageUrl,
    inputCompetitionId,
    isLoading,
    create
  }
}

export default useNew
