import { inject, InjectionKey, Ref } from '@nuxtjs/composition-api'

export const CurrentUserKey: InjectionKey<Ref<CurrentUser | null>> = Symbol('currentUser')

const useCurrentUser = (): Ref<CurrentUser | null> => {
  const currentUser = inject(CurrentUserKey)
  if (currentUser === undefined) throw new Error('currentUser is no provided')
  return currentUser
}

export default useCurrentUser
