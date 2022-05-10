import { inject, InjectionKey } from '@nuxtjs/composition-api'
import type { QueryDocumentSnapshot } from 'firebase/firestore'
import { Match, SearchOption } from '@/types/matches'

export const StoreKey: InjectionKey<{
  match: {
    data: Match[]
    lastVisible: QueryDocumentSnapshot<Match> | null
    searchOption: SearchOption
  }
}> = Symbol('matches')

const useStore = () => {
  const store = inject(StoreKey)
  if (store === undefined) throw new Error('store is no provided')

  return { store }
}

export default useStore
