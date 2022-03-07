import { Ref } from '@nuxtjs/composition-api'
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  TwitterAuthProvider,
  GoogleAuthProvider
} from 'firebase/auth'
const auth = getAuth()

export const signInEmail = async (isLoading: Ref<boolean>, email: string, password: string) => {
  isLoading.value = true
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  const user = userCredential.user
  isLoading.value = false
  return user
}

export const signInTwitter = async (isLoading: Ref<boolean>) => {
  isLoading.value = true
  const provider = new TwitterAuthProvider()
  const userCredential = await signInWithPopup(auth, provider)
  const user = userCredential.user
  isLoading.value = false
  return user
}

export const signInGoogle = async (isLoading: Ref<boolean>) => {
  isLoading.value = true
  const provider = new GoogleAuthProvider()
  const userCredential = await signInWithPopup(auth, provider)
  const user = userCredential.user
  isLoading.value = false
  return user
}
