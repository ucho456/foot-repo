import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  TwitterAuthProvider,
  GoogleAuthProvider
} from 'firebase/auth'
type SignInType = 'email' | 'twitter' | 'google'

export const signIn = async (type: SignInType, email: string, password: string) => {
  const auth = getAuth()
  const provider = type === 'twitter' ? new TwitterAuthProvider() : new GoogleAuthProvider()
  const userCredential =
    type === 'email'
      ? await signInWithEmailAndPassword(auth, email, password)
      : await signInWithPopup(auth, provider)
  const user = {
    uid: userCredential.user.uid,
    name: userCredential.user.displayName,
    photoUrl: userCredential.user.photoURL
  }
  return user
}
