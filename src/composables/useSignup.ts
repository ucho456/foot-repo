import { reactive, ref } from '@nuxtjs/composition-api'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  TwitterAuthProvider
} from 'firebase/auth'
import { fetchUser } from '@/db/users'

const useSignup = () => {
  const user = reactive({ email: '', password: '' })
  const isLoading = ref(false)

  const signupEmail = async (): Promise<'success' | 'already used' | 'failure'> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password)
      await sendEmailVerification(userCredential.user)
      return 'success'
    } catch (error) {
      return error instanceof Error && error.message.includes('auth/email-already-in-use')
        ? 'already used'
        : 'failure'
    } finally {
      isLoading.value = false
    }
  }

  const signupTwitter = async (): Promise<'success' | 'failure' | 'already exist'> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const provider = new TwitterAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      const uid = userCredential.user.uid
      const user = await fetchUser(uid)
      return !user ? 'success' : 'already exist'
    } catch {
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  const signupGoogle = async (): Promise<'success' | 'failure' | 'already exist'> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      const uid = userCredential.user.uid
      const user = await fetchUser(uid)
      return !user ? 'success' : 'already exist'
    } catch {
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  const isDialog = ref(false)
  const openDialog = (): void => {
    isDialog.value = true
  }
  const closeDialog = (): void => {
    isDialog.value = false
  }

  return {
    user,
    isLoading,
    signupEmail,
    signupTwitter,
    signupGoogle,
    isDialog,
    openDialog,
    closeDialog
  }
}

export default useSignup
