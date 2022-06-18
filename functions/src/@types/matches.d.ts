type Match = {
  id: string
  season: string
  jstDate: string
  yearMonth: string
  matchday: number
  status: 'SCHEDULED' | 'FINISHED'
  venue: string
  teamIds: string[]
  competition: {
    id: string
    ref: import('firebase-admin/firestore').DocumentReference
    name: string
    imageUrl: string
  }
  homeTeam: {
    id: string
    ref: import('firebase-admin/firestore').DocumentReference
    name: string
    shortName: string
    imageUrl: string
    score: number | null
    penalty: number | null
  }
  awayTeam: {
    id: string
    ref: import('firebase-admin/firestore').DocumentReference
    name: string
    shortName: string
    imageUrl: string
    score: number | null
    penalty: number | null
  }
  lastUpdated: string
}

type Position = 'GK' | 'DF' | 'MF' | 'FW' | 'HC' | null

type Player = {
  player: {
    id: string
    name: string
  }
  position: Position
  shirtNumber: number | null
}

type MatchDetail = {
  id: string
  homeLineup: Player[]
  homeBench: Player[]
  awayLineup: Player[]
  awayBench: Player[]
  goals: {
    keyId: string
    minute: number
    team: {
      id: string
      ref: import('firebase-admin/firestore').DocumentReference
      name: string
    }
    scorer: {
      id: string
      name: string
    }
    assist: null | {
      id: string
      name: string
    }
  }[]
  bookings: {
    keyId: string
    minute: number
    team: {
      id: string
      ref: import('firebase-admin/firestore').DocumentReference
      name: string
    }
    player: {
      id: string
      name: string
    }
    card: 'red' | 'yellow'
  }[]
  substitutions: {
    keyId: string
    minute: number
    team: {
      id: string
      ref: import('firebase-admin/firestore').DocumentReference
      name: string
    }
    outPlayer: {
      id: string
      name: string
    }
    inPlayer: {
      id: string
      name: string
    }
  }[]
  lastUpdated: string
}

type ForReport = {
  id: string
  homeTeamReportItems: ReportItem[]
  awayTeamReportItems: ReportItem[]
  lastUpdated: string
}
