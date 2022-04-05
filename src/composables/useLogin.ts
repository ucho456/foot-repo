import { reactive, ref } from '@nuxtjs/composition-api'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  TwitterAuthProvider
} from 'firebase/auth'
import { getFirestore, writeBatch } from 'firebase/firestore'
import { createInitUserDoc, getUserDoc } from '@/db/usersCollection'

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

  const loginTwitterOrGoogle = async (
    provider: TwitterAuthProvider | GoogleAuthProvider
  ): Promise<'success' | 'already exist' | 'failure'> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const userCredential = await signInWithPopup(auth, provider)
      const uid = userCredential.user.uid
      const user = await getUserDoc(uid)
      if (user?.completeInit) {
        return 'success'
      } else {
        const db = getFirestore()
        const batch = writeBatch(db)
        createInitUserDoc(
          batch,
          uid,
          userCredential.user.displayName || `user${new Date().getTime()}`,
          userCredential.user.photoURL
        )
        await batch.commit()
        return 'already exist'
      }
    } catch {
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  const loginTwitter = async (): Promise<'success' | 'already exist' | 'failure'> => {
    const provider = new TwitterAuthProvider()
    const result = await loginTwitterOrGoogle(provider)
    return result
  }

  const loginGoogle = async (): Promise<'success' | 'already exist' | 'failure'> => {
    const provider = new GoogleAuthProvider()
    const result = await loginTwitterOrGoogle(provider)
    return result
  }

  return { user, isLoading, loginEmail, loginTwitter, loginGoogle }
}

export default useLogin
