import { reactive, ref } from '@nuxtjs/composition-api'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  TwitterAuthProvider
} from 'firebase/auth'
import { fetchUser } from '@/db/users'

const useLogin = () => {
  const user = reactive({ email: '', password: '' })
  const isLoading = ref(false)

  const loginEmail = async (): Promise<'success' | 'failure'> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, user.email, user.password)
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  const loginTwitter = async (): Promise<'success' | 'failure' | 'not exist'> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const provider = new TwitterAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      const uid = userCredential.user.uid
      const user = await fetchUser(uid)
      return user ? 'success' : 'not exist'
    } catch {
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  const loginGoogle = async (): Promise<'success' | 'failure' | 'not exist'> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      const uid = userCredential.user.uid
      const user = await fetchUser(uid)
      return user ? 'success' : 'not exist'
    } catch {
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  return { user, isLoading, loginEmail, loginTwitter, loginGoogle }
}

export default useLogin
