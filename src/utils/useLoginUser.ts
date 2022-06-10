import { inject, InjectionKey, Ref } from '@nuxtjs/composition-api'
import { getAuth } from 'firebase/auth'

export const LoginUserKey: InjectionKey<Ref<LoginUser | null>> = Symbol('loginUser')

const useLoginUser = () => {
  const loginUser = inject(LoginUserKey)
  if (loginUser === undefined) throw new Error('loginUser is no provided')

  const setUpLoginUser = (user: User): void => {
    const auth = getAuth()
    if (auth.currentUser) {
      loginUser.value = {
        uid: user.id,
        name: user.name,
        imageUrl: user.imageUrl,
        competitionId: user.competitionId,
        teamId: user.teamId
      }
    } else {
      loginUser.value = null
    }
  }

  return { loginUser, setUpLoginUser }
}

export default useLoginUser
