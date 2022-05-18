type Competition = {
  id: string
  name: string
  type: 'cup' | 'league' | 'japan'
  imageUrl: string
}

type Scorers = {
  id: string
  season: string
  table: {
    playerName: string
    teamName: string
    goals: number
  }[]
}

type Standings = {
  id: string
  season: string
  table: {
    position: number
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