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
  users: {
    data: User[]
    lastVisible: QueryDocumentSnapshot<User> | null
    searchOption: SearchOption
  }
}> = Symbol('store')

const useStore = () => {
  const store = inject(StoreKey)
  if (store === undefined) throw new Error('store is no provided')

  const clearReportSearchOption = (): void => {
    store.reports.data = []
    store.reports.lastVisible = null
    store.reports.searchOption.competitionId = ''
    store.reports.searchOption.teamId = ''
    store.reports.searchOption.yearMonth = ''
  }

  return {
    clearReportSearchOption,
    confirmation: store.confirmation,
    league: store.league,
    match: store.match,
    matches: store.matches,
    reports: store.reports,
    team: store.team,
    users: store.users
  }
}

export default useStore
