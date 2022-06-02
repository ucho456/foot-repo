import { reactive, ref } from '@nuxtjs/composition-api'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  TwitterAuthProvider
} from 'firebase/auth'
import { getUser } from '@/db/users'
import useCurrentUser from '@/utils/useCurrentUser'

const useSignup = () => {
  const { setUpCurrentUser } = useCurrentUser()

  const user = reactive({ email: '', password: '' })

  const isDialog = ref(false)
  const openDialog = (): void => {
    isDialog.value = true
  }
  const closeDialog = (): void => {
    isDialog.value = false
  }

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

  const signupTwitter = async (): Promise<'success' | 'already exist' | 'failure'> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const provider = new TwitterAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      const uid = userCredential.user.uid
      const user = await getUser(uid)
      if (!user) {
        return 'success'
      } else {
        setUpCurrentUser()
        return 'already exist'
      }
    } catch {
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  const signupGoogle = async (): Promise<'success' | 'already exist' | 'failure'> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      const uid = userCredential.user.uid
      const user = await getUser(uid)
      if (!user) {
        return 'success'
      } else {
        setUpCurrentUser()
        return 'already exist'
      }
    } catch {
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    isDialog,
    openDialog,
    closeDialog,
    isLoading,
    signupEmail,
    signupTwitter,
    signupGoogle
  }
}

export default useSignup
