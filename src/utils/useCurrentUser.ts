import { inject, InjectionKey, Ref } from '@nuxtjs/composition-api'

export const CurrentUser: InjectionKey<Ref<CurrentUser | null>> = Symbol('currentUser')

const useCurrentUser = (): Ref<CurrentUser | null> => {
  const currentUser = inject(CurrentUser)
  if (currentUser === undefined) throw new Error('currentUser is no provided')
  return currentUser
}

export default useCurrentUser

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
//   const publicProfileRef = await doc(db, 'users', uid)
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
