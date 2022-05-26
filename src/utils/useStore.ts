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
  databases: {
    competitionId: string
    standings: Standings | null
    scorers: Scorers | null
    matches: Match[]
    season: string
    yearMonth: string
  }
}> = Symbol('matches')

const useStore = () => {
  const store = inject(StoreKey)
  if (store === undefined) throw new Error('store is no provided')

  const resetDatabases = (): void => {
    store.databases = {
      competitionId: '',
      standings: null,
      scorers: null,
      matches: [],
      season: '',
      yearMonth: ''
    }
  }

  return {
    matches: store.matches,
    reports: store.reports,
    databases: store.databases,
    resetDatabases
  }
}

export default useStore
