import { reactive, ref } from '@nuxtjs/composition-api'
import { writeBatch } from 'firebase/firestore'
import db from '@/plugins/firebase'
import { getUserDoc, updateInitUserDoc, uploadAndGetImageUrl } from '@/db/usersCollection'

const useNew = () => {
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
    teamId3: 0,
    completeInit: true
  })
  const userImageFile = ref<File | null>(null)

  const getUser = async (uid: string | undefined): Promise<void> => {
    const userDoc = await getUserDoc(uid)
    if (userDoc) {
      user.id = userDoc.id
      user.name = userDoc.name.substring(0, 20)
      user.imageUrl = userDoc.imageUrl
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

  const inputCompetitionId = (arg: { number: 1 | 2 | 3; id: number }): void => {
    const competitionId =
      arg.number === 1 ? 'competitionId1' : arg.number === 2 ? 'competitionId2' : 'competitionId3'
    const teamId = arg.number === 1 ? 'teamId1' : arg.number === 2 ? 'teamId2' : 'teamId3'
    user[competitionId] = arg.id
    user[teamId] = 0
  }

  const isLoading = ref(false)
  const updateInitUser = async (uid: string): Promise<'success' | 'failure'> => {
    try {
      isLoading.value = true
      const imageUrl = userImageFile.value ? await uploadAndGetImageUrl(userImageFile.value) : null
      if (imageUrl) user.imageUrl = imageUrl
      const batch = writeBatch(db)
      updateInitUserDoc(batch, uid, user)
      await batch.commit()
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    getUser,
    changeImageUrl,
    clearImageUrl,
    inputCompetitionId,
    isLoading,
    updateInitUser
  }
}

export default useNew
