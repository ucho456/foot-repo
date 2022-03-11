import { inject, InjectionKey, ref, Ref } from '@nuxtjs/composition-api'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  // signInWithEmailAndPassword,
  TwitterAuthProvider
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import db from '@/plugins/firebase'

export const CurrentUser: InjectionKey<Ref<User | null>> = Symbol('currentUser')

export const useCurrentUser = (): Ref<User | null> => {
  const currentUser = inject(CurrentUser)
  if (currentUser === undefined) throw new Error('currentUser is no provided')
  return currentUser
}

export const useSignup = () => {
  const isLoading = ref(false)
  const isError = ref(false)

  const signupEmail = async (email: string, password: string): Promise<void> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await sendEmailVerification(userCredential.user)
      alert('認証メールを送信しました。')
    } catch (error) {
      error instanceof Error && error.message.includes('auth/email-already-in-use')
        ? alert('既に使用されているメールアドレスです。')
        : alert('エラーが発生しました。')
    } finally {
      isLoading.value = false
    }
  }

  const createInitCurrentUser = async (
    provider: TwitterAuthProvider | GoogleAuthProvider
  ): Promise<InitCurrentUser | null> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const userCredential = await signInWithPopup(auth, provider)
      const uid = userCredential.user.uid
      const publicProfileRef = await doc(db, 'public-profiles', uid)
      const publicProfileSnap = await getDoc(publicProfileRef)
      if (publicProfileSnap.exists()) {
        return null
      } else {
        const initCurrentUser = {
          uid: userCredential.user.uid,
          name: userCredential.user.displayName,
          photoUrl: userCredential.user.photoURL
        }
        return initCurrentUser
      }
    } catch {
      isError.value = true
      return null
    } finally {
      isLoading.value = false
    }
  }

  const signupTwitter = async (): Promise<InitCurrentUser | null> => {
    const provider = new TwitterAuthProvider()
    const result = await createInitCurrentUser(provider)
    return result
  }

  const signupGoogle = async (): Promise<InitCurrentUser | null> => {
    const provider = new GoogleAuthProvider()
    const result = await createInitCurrentUser(provider)
    return result
  }

  return { isLoading, isError, signupEmail, signupTwitter, signupGoogle }
}

// export const login = async (
//   providerType: ProviderType,
//   email: string,
//   password: string
// ): Promise<InitCurrentUser | null> => {
//   const auth = getAuth()
//   const provider = providerType === 'twitter' ? new TwitterAuthProvider() : new GoogleAuthProvider()
//   const userCredential =
//     providerType === 'email'
//       ? await signInWithEmailAndPassword(auth, email, password)
//       : await signInWithPopup(auth, provider)

//   const uid = userCredential.user.uid
//   const publicProfileRef = await doc(db, 'public-profiles', uid)
//   const publicProfileSnap = await getDoc(publicProfileRef)
//   if (publicProfileSnap.exists()) {
//     return null
//   } else {
//     const initCurrentUser = {
//       uid: userCredential.user.uid,
//       name: userCredential.user.displayName,
//       photoUrl: userCredential.user.photoURL
//     }
//     return initCurrentUser
//   }
// }
