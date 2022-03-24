import { reactive, ref } from '@nuxtjs/composition-api'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  TwitterAuthProvider
} from 'firebase/auth'
import { doc, getDoc, writeBatch } from 'firebase/firestore'
import db from '@/plugins/firebase'

const useSignup = () => {
  const user = reactive({ email: '', password: '' })
  const isLoading = ref(false)

  const createInitUser = async (
    uid: string,
    name: string | null,
    photoUrl: string | null
  ): Promise<void> => {
    const batch = writeBatch(db)
    batch.set(doc(db, 'users', uid), { name, photoUrl })
    await batch.commit()
  }

  const signupEmail = async (): Promise<'success' | 'already used' | 'failure'> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password)
      await sendEmailVerification(userCredential.user)
      await createInitUser(userCredential.user.uid, `user${new Date().getTime()}`, null)
      return 'success'
    } catch (error) {
      return error instanceof Error && error.message.includes('auth/email-already-in-use')
        ? 'already used'
        : 'failure'
    } finally {
      isLoading.value = false
    }
  }

  const createInitCurrentUser = async (
    provider: TwitterAuthProvider | GoogleAuthProvider
  ): Promise<'success' | 'already exist' | 'failure'> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const userCredential = await signInWithPopup(auth, provider)
      const uid = userCredential.user.uid
      const uSnapshot = await getDoc(doc(db, 'users', uid))
      if (!uSnapshot.exists()) {
        const name = userCredential.user.displayName
        const photoUrl = userCredential.user.photoURL
        await createInitUser(uid, name, photoUrl)
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
    const result = await createInitCurrentUser(provider)
    return result
  }

  const signupGoogle = async (): Promise<'success' | 'already exist' | 'failure'> => {
    const provider = new GoogleAuthProvider()
    const result = await createInitCurrentUser(provider)
    return result
  }

  return { user, isLoading, signupEmail, signupTwitter, signupGoogle }
}

export default useSignup
