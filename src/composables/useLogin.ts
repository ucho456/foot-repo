import { reactive, ref } from '@nuxtjs/composition-api'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  TwitterAuthProvider
} from 'firebase/auth'
import useCurrentUser from '@/utils/useCurrentUser'

const useLogin = () => {
  const { setUpCurrentUser } = useCurrentUser()
  const user = reactive({ email: '', password: '' })
  const isLoading = ref(false)

  const loginEmail = async (): Promise<'success' | 'failure'> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, user.email, user.password)
      await setUpCurrentUser()
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  const loginTwitter = async (): Promise<'success' | 'failure'> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const provider = new TwitterAuthProvider()
      await signInWithPopup(auth, provider)
      await setUpCurrentUser()
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  const loginGoogle = async (): Promise<'success' | 'failure'> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      await setUpCurrentUser()
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  return { user, isLoading, loginEmail, loginTwitter, loginGoogle }
}

export default useLogin
