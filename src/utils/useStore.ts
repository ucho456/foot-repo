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
    hasNext: boolean
  }
  reports: {
    data: Report[]
    lastVisible: QueryDocumentSnapshot<Report> | null
    searchOption: SearchOption
    hasNext: boolean
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
  users: {
    data: User[]
    lastVisible: QueryDocumentSnapshot<User> | null
    searchOption: SearchOption
  }
}> = Symbol('store')

const useStore = () => {
  const store = inject(StoreKey)
  if (store === undefined) throw new Error('store is no provided')

  const resetReports = (): void => {
    store.reports.data = []
    store.reports.lastVisible = null
    store.reports.searchOption.competitionId = ''
    store.reports.searchOption.teamId = ''
    store.reports.searchOption.yearMonth = ''
    store.reports.hasNext = true
  }

  const resetMatches = (): void => {
    store.matches.data = []
    store.matches.lastVisible = null
    store.matches.searchOption.status = 'FINISHED'
    store.matches.searchOption.competitionId = ''
    store.matches.searchOption.teamId = ''
    store.matches.searchOption.yearMonth = ''
    store.matches.hasNext = true
  }

  return {
    confirmation: store.confirmation,
    league: store.league,
    match: store.match,
    matches: store.matches,
    reports: store.reports,
    resetMatches,
    resetReports,
    team: store.team,
    users: store.users
  }
}

export default useStore
