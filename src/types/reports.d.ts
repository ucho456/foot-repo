type Report = {
  id: string
  title: string
  user: {
    ref: import('firebase/firestore').DocumentReference
    name: string
    imageUrl: string | null
  }
  homeTeam: {
    name: string
    score: number
  }
  awayTeam: {
    name: string
    score: number
  }
  competition: {
    id: string
    name: string
  }
  jstDate: string
  match: {
    ref: import('firebase/firestore').DocumentReference
  }
  selectTeam: HomeAway
  momId: string
  summary: string
  teamIds: string[]
  createdAt: import('firebase/firestore').FieldValue
}

type ReportItem = {
  id: string
  playerName: string
  position: Position
  shirtNumber: number
  point: Point
  text: string
  order: number
}
