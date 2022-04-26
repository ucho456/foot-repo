import type { DocumentReference } from 'firebase-admin/firestore'

type Match = {
  id: number
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
