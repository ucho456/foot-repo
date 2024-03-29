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
    lastVisible: QueryDocumentSnapshot<Match> | null
    hasNext: boolean
    season: string
    yearMonth: string
  }
  cup: {
    name: string
    competitionId: string
    standings: Standings | null
    scorers: Scorers | null
    matchSchedule: Match[]
    lastVisible: QueryDocumentSnapshot<Match> | null
    hasNext: boolean
    season: string
    yearMonth: string
  }
  japan: {
    matchSchedule: Match[]
    season: string
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
    hasNext: boolean
  }
}> = Symbol('store')

const useStore = () => {
  const store = inject(StoreKey)
  if (store === undefined) throw new Error('store is no provided')

  const resetConfirmation = (): void => {
    store.confirmation.isLogin = false
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

  const resetReports = (): void => {
    store.reports.data = []
    store.reports.lastVisible = null
    store.reports.searchOption.competitionId = ''
    store.reports.searchOption.teamId = ''
    store.reports.searchOption.yearMonth = ''
    store.reports.hasNext = true
  }

  const resetLeague = (): void => {
    store.league.name = ''
    store.league.competitionId = ''
    store.league.standings = null
    store.league.scorers = null
    store.league.matchSchedule = []
    store.league.lastVisible = null
    store.league.hasNext = true
    store.league.season = ''
    store.league.yearMonth = ''
  }

  const resetCup = (): void => {
    store.cup.name = ''
    store.cup.competitionId = ''
    store.cup.standings = null
    store.cup.scorers = null
    store.cup.matchSchedule = []
    store.cup.lastVisible = null
    store.cup.hasNext = true
    store.cup.season = ''
    store.cup.yearMonth = ''
  }

  const resetJapan = (): void => {
    store.japan.matchSchedule = []
    store.japan.season = String(new Date().getFullYear())
  }

  const resetTeam = (): void => {
    store.team.data = null
  }

  const resetMatch = (): void => {
    store.match.data = null
    store.match.detail = null
    store.match.reports = []
  }

  const resetUsers = (): void => {
    store.users.data = []
    store.users.lastVisible = null
    store.users.searchOption.competitionId = ''
    store.users.searchOption.teamId = ''
    store.users.searchOption.yearMonth = ''
    store.users.hasNext = true
  }

  return {
    confirmation: store.confirmation,
    cup: store.cup,
    japan: store.japan,
    league: store.league,
    match: store.match,
    matches: store.matches,
    reports: store.reports,
    resetConfirmation,
    resetCup,
    resetJapan,
    resetLeague,
    resetMatch,
    resetMatches,
    resetReports,
    resetTeam,
    resetUsers,
    team: store.team,
    users: store.users
  }
}

export default useStore
