import type { DocumentReference } from 'firebase-admin/firestore'

type Standings = {
  id: string
  season: string
  table: {
    position: number
    team: {
      ref: DocumentReference
      id: number
      name: string
      imageUrl: string
    }
    playedGames: number
    won: number
    draw: number
    lost: number
    points: number
    goalsFor: number
    goalsAgainst: number
    goalsDifference: number
  }[]
}
