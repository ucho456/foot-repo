type Match = {
  id: string
  season: string
  jstDate: string
  yearMonth: string
  matchday: number
  status: MatchStatus
  venue: string
  teamIds: string[]
  competition: {
    id: string
    ref: import('firebase/firestore').DocumentReference
    name: string
    imageUrl: string
  }
  homeTeam: {
    id: string
    ref: import('firebase/firestore').DocumentReference
    name: string
    shortName: string
    imageUrl: string
    score: number | null
    penalty: number | null
  }
  awayTeam: {
    id: string
    ref: import('firebase/firestore').DocumentReference
    name: string
    shortName: string
    imageUrl: string
    score: number | null
    penalty: number | null
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
    keyId: string
    minute: number
    teamName: string
    goalPlayerName: string
    assistPlayerName: string | null
  }[]
  bookings: {
    keyId: string
    minute: number
    teamName: string
    playerName: string
    card: Card
  }[]
  substitutions: {
    keyId: string
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
