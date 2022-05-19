import { inject, InjectionKey } from '@nuxtjs/composition-api'
import type { QueryDocumentSnapshot } from 'firebase/firestore'

export const StoreKey: InjectionKey<{
  matches: {
    data: Match[]
    lastVisible: QueryDocumentSnapshot<Match> | null
    searchOption: SearchOption
  }
  reports: {
    data: Report[]
    lastVisible: QueryDocumentSnapshot<Report> | null
    searchOption: SearchOption
  }
}> = Symbol('matches')

const useStore = () => {
  const store = inject(StoreKey)
  if (store === undefined) throw new Error('store is no provided')

  return { matches: store.matches, reports: store.reports }
}

export default useStore
