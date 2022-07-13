import { inject, InjectionKey, Ref } from '@nuxtjs/composition-api'
import { getAuth } from 'firebase/auth'

export const LoginUserKey: InjectionKey<Ref<LoginUser | null>> = Symbol('loginUser')

const useLoginUser = () => {
  const loginUser = inject(LoginUserKey)
  if (loginUser === undefined) throw new Error('loginUser is no provided')

  const setUpLoginUser = (inputUser: InputUser): void => {
    const auth = getAuth()
    if (auth.currentUser) {
      loginUser.value = {
        uid: inputUser.id,
        name: inputUser.name,
        imageUrl: inputUser.imageUrl,
        competitionId: inputUser.competitionId,
        team: inputUser.team,
        greet: inputUser.greet
      }
    } else {
      loginUser.value = null
    }
  }

  return { loginUser, setUpLoginUser }
}

export default useLoginUser
