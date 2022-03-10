import { InjectionKey, Ref, inject } from '@nuxtjs/composition-api'
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  TwitterAuthProvider,
  GoogleAuthProvider
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import db from '@/plugins/firebase'

type LoginType = 'email' | 'twitter' | 'google'

export const CurrentUser: InjectionKey<Ref<User | null>> = Symbol('currentUser')

export const useCurrentUser = (): Ref<User | null> => {
  const currentUser = inject(CurrentUser)
  if (currentUser === undefined) throw new Error('currentUser is no provided')
  return currentUser
}

export const login = async (type: LoginType, email: string, password: string) => {
  const auth = getAuth()
  const provider = type === 'twitter' ? new TwitterAuthProvider() : new GoogleAuthProvider()
  const userCredential =
    type === 'email'
      ? await signInWithEmailAndPassword(auth, email, password)
      : await signInWithPopup(auth, provider)

  const uid = userCredential.user.uid
  const publicProfileRef = await doc(db, 'public-profiles', uid)
  const publicProfileSnap = await getDoc(publicProfileRef)
  if (publicProfileSnap.exists()) {
    return {}
  } else {
    console.log('false')
    const user = {
      uid: userCredential.user.uid,
      name: userCredential.user.displayName,
      photoUrl: userCredential.user.photoURL
    }
    return { user }
  }
}
