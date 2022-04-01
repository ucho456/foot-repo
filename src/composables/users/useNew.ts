import { reactive, ref } from '@nuxtjs/composition-api'
import { writeBatch } from 'firebase/firestore'
import db from '@/plugins/firebase'
import { fetchUserDoc, updateUserDoc, uploadAndGetPhotoUrl } from '@/db/usersCollection'

const useNew = () => {
  const user: User = reactive({
    id: '',
    name: '',
    photoUrl: null
  })
  const userPhotoFile = ref<File | null>(null)

  const fetchUser = async (uid: string): Promise<void> => {
    const userDoc = await fetchUserDoc(uid)
    if (userDoc) {
      user.id = userDoc.id
      user.name = userDoc.name.substring(0, 20)
      user.photoUrl = userDoc.photoUrl
    }
  }

  const changePhotoUrl = (imageFile: File): void => {
    user.photoUrl = URL.createObjectURL(imageFile)
    userPhotoFile.value = imageFile
  }

  const clearPhotoUrl = (): void => {
    user.photoUrl = null
    userPhotoFile.value = null
  }

  const isLoading = ref(false)
  const updateUser = async (uid: string): Promise<'success' | 'failure'> => {
    try {
      isLoading.value = true
      const photoUrl = userPhotoFile.value ? await uploadAndGetPhotoUrl(userPhotoFile.value) : null
      if (photoUrl) user.photoUrl = photoUrl
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

  return { user, fetchUser, changePhotoUrl, clearPhotoUrl, isLoading, updateUser }
}

export default useNew
