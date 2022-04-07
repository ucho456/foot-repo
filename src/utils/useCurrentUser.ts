import { inject, InjectionKey, Ref } from '@nuxtjs/composition-api'
import { getUserDoc } from '@/db/usersCollection'

export const CurrentUserKey: InjectionKey<Ref<CurrentUser | null>> = Symbol('currentUser')

const useCurrentUser = () => {
  const currentUser = inject(CurrentUserKey)
  if (currentUser === undefined) throw new Error('currentUser is no provided')

  const resetCurrentUser = async () => {
    if (currentUser.value) {
      const user = await getUserDoc(currentUser.value.uid)
      if (user) {
        currentUser.value = {
          uid: user.id,
          name: user.name,
          imageUrl: user.imageUrl
        }
      } else {
        // user/newに遷移させる。
        currentUser.value = null
      }
    } else {
      currentUser.value = null
    }
  }

  return { currentUser, resetCurrentUser }
}

export default useCurrentUser
