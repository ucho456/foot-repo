type Competitions = {
  name: string
  type: 'cup' | 'league' | 'japan'
  imageUrl: string
}

type Standings = {
  id: string
  season: string
  table: {
    position: number
    team: {
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

type Scorers = {
  id: string
  season: string
  table: {
    playerName: string
    teamName: string
    goals: number
  }[]
}
