import { reactive, ref } from '@nuxtjs/composition-api'
import { doc, setDoc } from 'firebase/firestore'
import useCurrentUser from '@/composables/useCurrentUser'
import db from '@/plugins/firebase'

const useNew = () => {
  const currentUser = useCurrentUser()
  const uid = currentUser.value?.uid || ''
  const publicProfile = reactive({
    name: currentUser.value?.name || `${new Date().getTime()}`,
    photoUrl: currentUser.value?.photoUrl || ''
  })
  const isLoading = ref(false)

  const create = async (): Promise<'success' | 'failure'> => {
    try {
      isLoading.value = true
      await setDoc(doc(db, 'public-profiles', uid), publicProfile)
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  return { publicProfile, isLoading, create }
}

export default useNew
