import { inject, InjectionKey, Ref } from '@nuxtjs/composition-api'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getUserDoc } from '@/db/usersCollection'

export const CurrentUserKey: InjectionKey<Ref<CurrentUser | null>> = Symbol('currentUser')

const useCurrentUser = () => {
  const currentUser = inject(CurrentUserKey)
  if (currentUser === undefined) throw new Error('currentUser is no provided')

  const setUpCurrentUser = async () => {
    const auth = getAuth()
    await onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const user = await getUserDoc(authUser.uid)
        const idTokenResult = await authUser.getIdTokenResult(true)
        console.log('idTokenResult.claims.initSetting', idTokenResult.claims.initSetting)
        if (user && idTokenResult.claims.initSetting) {
          currentUser.value = {
            uid: user.id,
            name: user.name,
            imageUrl: user.imageUrl,
            subscription: idTokenResult.claims.subscription as unknown as boolean
          }
        } else if (!idTokenResult.claims.initSetting) {
          currentUser.value = null
          console.log('initSetting false')
        }
      } else {
        currentUser.value = null
      }
    })
  }

  return { currentUser, setUpCurrentUser }
}

export default useCurrentUser
