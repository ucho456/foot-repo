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

export const CurrentUser: InjectionKey<Ref<User | null>> = Symbol('currentUser')

export const useCurrentUser = (): Ref<User | null> => {
  const currentUser = inject(CurrentUser)
  if (currentUser === undefined) throw new Error('currentUser is no provided')
  return currentUser
}

export const signup = async (
  providerType: ProviderType,
  email: string,
  password: string
): Promise<initCurrentUser | null> => {
  const auth = getAuth()
  const provider = providerType === 'twitter' ? new TwitterAuthProvider() : new GoogleAuthProvider()
  const userCredential =
    providerType === 'email'
      ? await signInWithEmailAndPassword(auth, email, password)
      : await signInWithPopup(auth, provider)

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
}

export const login = async (
  providerType: ProviderType,
  email: string,
  password: string
): Promise<initCurrentUser | null> => {
  const auth = getAuth()
  const provider = providerType === 'twitter' ? new TwitterAuthProvider() : new GoogleAuthProvider()
  const userCredential =
    providerType === 'email'
      ? await signInWithEmailAndPassword(auth, email, password)
      : await signInWithPopup(auth, provider)

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
}
