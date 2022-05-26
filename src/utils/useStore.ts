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
  league: {
    competitionId: string
    standings: Standings | null
    scorers: Scorers | null
    matchSchedule: Match[]
    season: string
    yearMonth: string
  }
}> = Symbol('store')

const useStore = () => {
  const store = inject(StoreKey)
  if (store === undefined) throw new Error('store is no provided')

  const resetLeague = (): void => {
    store.league = {
      competitionId: '',
      standings: null,
      scorers: null,
      matchSchedule: [],
      season: '',
      yearMonth: ''
    }
  }

  return {
    matches: store.matches,
    reports: store.reports,
    league: store.league,
    resetLeague
  }
}

export default useStore
