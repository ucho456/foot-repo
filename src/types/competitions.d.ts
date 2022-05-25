type Competition = {
  id: string
  name: string
  type: 'cup' | 'league' | 'japan'
  imageUrl: string
}

// playerId teamId positionを加える。10人に絞る。
type Scorers = {
  id: string
  season: string
  table: {
    playerName: string
    teamName: string
    goals: number
  }[]
}

// teamIdが無い
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
