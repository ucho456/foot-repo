import { inject, InjectionKey } from '@nuxtjs/composition-api'
import type { QueryDocumentSnapshot } from 'firebase/firestore'

export const StoreKey: InjectionKey<{
  confirmation: {
    isLogin: boolean
  }
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
    name: string
    competitionId: string
    standings: Standings | null
    scorers: Scorers | null
    matchSchedule: Match[]
    season: string
    yearMonth: string
  }
  team: {
    data: Team | null
  }
  match: {
    data: Match | null
    detail: MatchDetail | null
    reports: Report[]
  }
}> = Symbol('store')

const useStore = () => {
  const store = inject(StoreKey)
  if (store === undefined) throw new Error('store is no provided')

  const resetLeague = (): void => {
    store.league = {
      name: '',
      competitionId: '',
      standings: null,
      scorers: null,
      matchSchedule: [],
      season: '',
      yearMonth: ''
    }
  }

  return {
    confirmation: store.confirmation,
    matches: store.matches,
    reports: store.reports,
    league: store.league,
    resetLeague,
    team: store.team,
    match: store.match
  }
}

export default useStore
