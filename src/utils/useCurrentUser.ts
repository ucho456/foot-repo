import { inject, InjectionKey, Ref } from '@nuxtjs/composition-api'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getUser } from '@/db/usersCollection'

export const CurrentUserKey: InjectionKey<Ref<CurrentUser | null>> = Symbol('currentUser')

const useCurrentUser = () => {
  const currentUser = inject(CurrentUserKey)
  if (currentUser === undefined) throw new Error('currentUser is no provided')

  const setUpCurrentUser = async (): Promise<void> => {
    await new Promise((resolve) => {
      const auth = getAuth()
      const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
        if (authUser) {
          const user = await getUser(authUser.uid)
          const idTokenResult = await authUser.getIdTokenResult(true)
          currentUser.value =
            user && idTokenResult.claims.initSetting
              ? {
                  uid: user.id,
                  name: user.name,
                  imageUrl: user.imageUrl,
                  teamId1: user.teamId1,
                  teamId2: user.teamId2,
                  teamId3: user.teamId3,
                  initSetting: idTokenResult.claims.initSetting as unknown as boolean,
                  subscription: idTokenResult.claims.subscription as unknown as boolean,
                  suspended: idTokenResult.claims.suspended as unknown as boolean
                }
              : null
        } else {
          currentUser.value = null
        }
        resolve(unsubscribe)
      })
    })
  }

  return { currentUser, setUpCurrentUser }
}

export default useCurrentUser
