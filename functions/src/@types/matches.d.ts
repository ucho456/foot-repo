type Match = {
  id: string
  season: string
  jstDate: string
  yearMonth: string
  matchday: number
  status: 'SCHEDULED' | 'FINISHED'
  teamIds: string[]
  competition: {
    id: string
    ref: import('firebase-admin/firestore').DocumentReference
    name: string
  }
  homeTeam: {
    id: string
    ref: import('firebase-admin/firestore').DocumentReference
    name: string
    imageUrl: string
    score: number | null
    penalty: number | null
    goalPlayers: {
      keyId: string
      minute: number
      name: string
    }[]
  }
  awayTeam: {
    id: string
    ref: import('firebase-admin/firestore').DocumentReference
    name: string
    imageUrl: string
    score: number | null
    penalty: number | null
    goalPlayers: {
      keyId: string
      minute: number
      name: string
    }[]
  }
  lastUpdated: string
}

type Position = 'GK' | 'DF' | 'MF' | 'FW' | 'HC'

type Player = {
  id: string
  name: string
  position: Position
  shirtNumber: number | null
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
    minute: number
    teamName: string
    goalPlayerName: string
    assistPlayerName: string | null
  }[]
  bookings: {
    minute: number
    teamName: string
    playerName: string
    card: 'red' | 'yellow'
  }[]
  substitutions: {
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
