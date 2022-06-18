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

  const loginEmail = async (): Promise<
    'success' | 'failure' | 'wrong email or password' | 'unverified' | 'no user'
  > => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password)
      if (!auth.currentUser?.emailVerified) {
        await signOut(auth)
        return 'unverified'
      }
      const uid = userCredential.user.uid
      const resUser = await fetchUser(uid)
      return resUser ? 'success' : 'no user'
    } catch (error) {
      console.log(error)
      return error instanceof Error && error.message.includes('auth/user-not-found')
        ? 'wrong email or password'
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
      const resUser = await fetchUser(uid)
      return resUser ? 'success' : 'no user'
    } catch (error) {
      console.log(error)
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
      const resUser = await fetchUser(uid)
      return resUser ? 'success' : 'no user'
    } catch (error) {
      console.log(error)
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  return { user, isLoading, loginEmail, loginTwitter, loginGoogle }
}

export default useLogin
