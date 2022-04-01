import { reactive, ref } from '@nuxtjs/composition-api'
import { writeBatch } from 'firebase/firestore'
import db from '@/plugins/firebase'
import { getUserDoc, updateUserDoc, uploadAndGetImageUrl } from '@/db/usersCollection'

const useNew = () => {
  const user: User = reactive({
    id: '',
    name: '',
    imageUrl: null
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

  const isLoading = ref(false)
  const updateUser = async (uid: string): Promise<'success' | 'failure'> => {
    try {
      isLoading.value = true
      const imageUrl = userImageFile.value ? await uploadAndGetImageUrl(userImageFile.value) : null
      if (imageUrl) user.imageUrl = imageUrl
      const batch = writeBatch(db)
      updateUserDoc(batch, uid, user)
      await batch.commit()
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  return { user, getUser, changeImageUrl, clearImageUrl, isLoading, updateUser }
}

export default useNew
