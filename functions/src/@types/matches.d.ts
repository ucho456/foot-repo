import type { DocumentReference } from 'firebase-admin/firestore'

type Match = {
  id: string
  season: string
  jstDate: string
  matchday: number
  status: 'SCHEDULED' | 'FINISHED'
  teamIds: number[]
  homeTeam: {
    ref: DocumentReference
    id: number
    name: string
    score: number | null
    penalty: number | null
    goalPlayers: {
      minute: number
      name: string
    }[]
  }
  awayTeam: {
    ref: DocumentReference
    id: number
    name: string
    score: number | null
    penalty: number | null
    goalPlayers: {
      minute: number
      name: string
    }[]
  }
  lastUpdated: string
}

type Position = 'GK' | 'DF' | 'MF' | 'FW' | 'HC'

type Player = {
  id: number
  name: string
  position: Position
  shirtNumber: number | null
}

type MatchDetail = {
  id: string
  homeLineup: Player[]
  homeBench: Player[]
  homeCoach: {
    id: number
    name: string
  }
  awayLineup: Player[]
  awayBench: Player[]
  awayCoach: {
    id: number
    name: string
  }
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
}

type ForReport = {
  id: string
  homePlayers: Player[]
  awayPlayers: Player[]
}
