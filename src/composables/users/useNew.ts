import { reactive, ref } from '@nuxtjs/composition-api'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createUser, uploadAndGetImageUrl } from '@/db/usersCollection'

const useNew = () => {
  const unauthorized = ref(false)
  const user: User = reactive({
    id: '',
    name: '',
    imageUrl: null,
    greet: '',
    competitionId1: 0,
    teamId1: 0,
    competitionId2: 0,
    teamId2: 0,
    competitionId3: 0,
    teamId3: 0
  })
  const userImageFile = ref<File | null>(null)

  const setUpUser = async () => {
    const auth = getAuth()
    await onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const idTokenResult = await authUser.getIdTokenResult(true)
        if (idTokenResult.claims.initSetting) {
          unauthorized.value = true
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

  const inputCompetitionId = (arg: { number: 1 | 2 | 3; id: number }): void => {
    const competitionId =
      arg.number === 1 ? 'competitionId1' : arg.number === 2 ? 'competitionId2' : 'competitionId3'
    const teamId = arg.number === 1 ? 'teamId1' : arg.number === 2 ? 'teamId2' : 'teamId3'
    user[competitionId] = arg.id
    user[teamId] = 0
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
    unauthorized,
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
