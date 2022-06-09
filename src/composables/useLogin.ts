import { reactive, ref } from '@nuxtjs/composition-api'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  TwitterAuthProvider
} from 'firebase/auth'
import { fetchUser } from '@/db/users'

const useLogin = () => {
  const user = reactive({ email: '', password: '' })
  const isLoading = ref(false)

  const loginEmail = async (): Promise<'success' | 'failure' | 'no user' | 'unverified'> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, user.email, user.password)
      if (!auth.currentUser?.emailVerified) {
        await signOut(auth)
        return 'unverified'
      } else {
        return 'success'
      }
    } catch (error) {
      return error instanceof Error && error.message.includes('auth/user-not-found')
        ? 'no user'
        : 'failure'
    } finally {
      isLoading.value = false
    }
  }

  const loginTwitter = async (): Promise<'success' | 'failure' | 'no user'> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const provider = new TwitterAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      const uid = userCredential.user.uid
      const user = await fetchUser(uid)
      return user ? 'success' : 'no user'
    } catch {
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  const loginGoogle = async (): Promise<'success' | 'failure' | 'no user'> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      const uid = userCredential.user.uid
      const user = await fetchUser(uid)
      return user ? 'success' : 'no user'
    } catch {
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  return { user, isLoading, loginEmail, loginTwitter, loginGoogle }
}

export default useLogin
