import { reactive, ref } from '@nuxtjs/composition-api'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  TwitterAuthProvider
} from 'firebase/auth'
import { getFirestore, writeBatch } from 'firebase/firestore'
import { createInitUserDoc, getUserDoc } from '@/db/usersCollection'

const useSignup = () => {
  const user = reactive({ email: '', password: '' })
  const isLoading = ref(false)

  const signupEmail = async (): Promise<'success' | 'already used' | 'failure'> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password)
      await sendEmailVerification(userCredential.user)
      const db = getFirestore()
      const batch = writeBatch(db)
      createInitUserDoc(batch, userCredential.user.uid, `user${new Date().getTime()}`, null)
      await batch.commit()
      return 'success'
    } catch (error) {
      return error instanceof Error && error.message.includes('auth/email-already-in-use')
        ? 'already used'
        : 'failure'
    } finally {
      isLoading.value = false
    }
  }

  const createInitUser = async (
    provider: TwitterAuthProvider | GoogleAuthProvider
  ): Promise<'success' | 'already exist' | 'failure'> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const userCredential = await signInWithPopup(auth, provider)
      const uid = userCredential.user.uid
      const user = await getUserDoc(uid)
      if (!user || user.completeInit === false) {
        const db = getFirestore()
        const batch = writeBatch(db)
        createInitUserDoc(
          batch,
          uid,
          userCredential.user.displayName || `user${new Date().getTime()}`,
          userCredential.user.photoURL
        )
        await batch.commit()
        return 'success'
      } else {
        return 'already exist'
      }
    } catch {
      return 'failure'
    } finally {
      isLoading.value = false
    }
  }

  const signupTwitter = async (): Promise<'success' | 'already exist' | 'failure'> => {
    const provider = new TwitterAuthProvider()
    const result = await createInitUser(provider)
    return result
  }

  const signupGoogle = async (): Promise<'success' | 'already exist' | 'failure'> => {
    const provider = new GoogleAuthProvider()
    const result = await createInitUser(provider)
    return result
  }

  return { user, isLoading, signupEmail, signupTwitter, signupGoogle }
}

export default useSignup
