import { ref } from '@nuxtjs/composition-api'
import { disableNetwork, enableNetwork, getFirestore } from 'firebase/firestore'

const useToggleOffline = () => {
  const showable = ref(process.env.NODE_ENV === 'development')
  const networkStatus = ref('enable')
  const handleEnableNetwork = async () => {
    const db = getFirestore()
    await enableNetwork(db)
  }
  const handleDisableNetwork = async () => {
    const db = getFirestore()
    await disableNetwork(db)
  }

  return { handleDisableNetwork, handleEnableNetwork, networkStatus, showable }
}

export default useToggleOffline
