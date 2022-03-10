import { InjectionKey, Ref, inject } from '@nuxtjs/composition-api'

export const CurrentUser: InjectionKey<Ref<User | null>> = Symbol('currentUser')

export const useCurrentUser = (): Ref<User | null> => {
  const currentUser = inject(CurrentUser)
  if (currentUser === undefined) throw new Error('currentUser is no provided')
  return currentUser
}
