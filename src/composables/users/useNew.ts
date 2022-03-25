import { reactive, ref } from '@nuxtjs/composition-api'
import { writeBatch } from 'firebase/firestore'
import db from '@/plugins/firebase'
import { getUserDoc, updateUserDoc } from '@/db/usersCollection'

const useNew = () => {
  const user: User = reactive({
    id: '',
    name: '',
    photoUrl: null
  })

  const get = async (uid: string): Promise<void> => {
    const userDoc = await getUserDoc(uid)
    if (userDoc) {
      user.id = userDoc.id
      user.name = userDoc.name
      user.photoUrl = userDoc.photoUrl
    }
  }

  const isLoading = ref(false)

  const update = async (uid: string): Promise<'success' | 'failure'> => {
    try {
      isLoading.value = true
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

  return { user, get, isLoading, update }
}

export default useNew
