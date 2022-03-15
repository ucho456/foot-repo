import { reactive } from '@nuxtjs/composition-api'
import useCurrentUser from '@/composables/useCurrentUser'

const useNew = () => {
  const currentUser = useCurrentUser()
  const publicProfile = reactive({
    uid: currentUser.value?.uid || '',
    name: currentUser.value?.name || '',
    photoUrl: currentUser.value?.photoUrl || ''
  })

  return { publicProfile }
}

export default useNew
