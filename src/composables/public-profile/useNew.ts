import { reactive, ref } from '@nuxtjs/composition-api'
import { doc, setDoc } from 'firebase/firestore'
import db from '@/plugins/firebase'
import useCurrentUser from '@/utils/useCurrentUser'

const useNew = () => {
  const currentUser = useCurrentUser()
  console.log('public-profile useNew currentUser', currentUser)
  console.log(currentUser.value?.name)
  const uid = currentUser.value?.uid || ''
  const publicProfile = reactive({
    name: currentUser.value?.name || `${new Date().getTime()}`,
    photoUrl: currentUser.value?.photoUrl || ''
  })
  console.log(publicProfile)
  const isLoading = ref(false)

  const create = async (): Promise<'success' | 'failure'> => {
    try {
      isLoading.value = true
      await setDoc(doc(db, 'users', uid), publicProfile)
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
