type Competitions = {
  id: string
  name: string
  type: 'cup' | 'league' | 'japan'
  imageUrl: string
}

type Scorers = {
  id: string
  season: string
  table: {
    keyId: string
    rank: number
    playerName: string
    teamName: string
    goals: number
    assists: number
    penalties: number
  }[]
}

type Standings = {
  id: string
  season: string
  table: {
    rank: number
    team: {
      id: string
      ref: import('firebase-admin/firestore').DocumentReference
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
