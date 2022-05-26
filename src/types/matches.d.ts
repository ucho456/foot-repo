// yearMonthのカラムを加える
type Match = {
  id: string
  season: string
  jstDate: string
  matchday: number
  status: 'SCHEDULED' | 'FINISHED'
  teamIds: string[]
  competition: {
    id: string
    ref: import('firebase/firestore').DocumentReference
    name: string
  }
  homeTeam: {
    id: string
    ref: import('firebase/firestore').DocumentReference
    name: string
    score: number | null
    penalty: number | null
    goalPlayers: {
      id: string
      minute: number
      name: string
    }[]
  }
  awayTeam: {
    id: string
    ref: import('firebase/firestore').DocumentReference
    name: string
    score: number | null
    penalty: number | null
    goalPlayers: {
      id: string
      minute: number
      name: string
    }[]
  }
  lastUpdated: string
}

type MatchDetail = {
  id: string
  homeLineup: Player[]
  homeBench: Player[]
  homeCoachName: string
  awayLineup: Player[]
  awayBench: Player[]
  awayCoachName: string
  goals: {
    id: string
    minute: number
    teamName: string
    goalPlayerName: string
    assistPlayerName: string | null
  }[]
  bookings: {
    id: string
    minute: number
    teamName: string
    playerName: string
    card: 'red' | 'yellow'
  }[]
  substitutions: {
    id: string
    minute: number
    teamName: string
    outPlayerName: string
    inPlayerName: string
  }[]
  lastUpdated: string
}

type ForReport = {
  id: string
  homeTeamReportItems: ReportItem[]
  awayTeamReportItems: ReportItem[]
  lastUpdated: string
}
