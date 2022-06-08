import { inject, InjectionKey, Ref } from '@nuxtjs/composition-api'
import { getAuth } from 'firebase/auth'

export const CurrentUserKey: InjectionKey<Ref<CurrentUser | null>> = Symbol('currentUser')

const useCurrentUser = () => {
  const currentUser = inject(CurrentUserKey)
  if (currentUser === undefined) throw new Error('currentUser is no provided')

  const setUpCurrentUser = (user: User): void => {
    const auth = getAuth()
    if (auth.currentUser) {
      currentUser.value = {
        uid: user.id,
        name: user.name,
        imageUrl: user.imageUrl,
        competitionId: user.competitionId,
        teamId: user.teamId,
        initSetting: true,
        subscription: false,
        suspended: false
      }
    } else {
      currentUser.value = null
    }
  }

  return { currentUser, setUpCurrentUser }
}

export default useCurrentUser
