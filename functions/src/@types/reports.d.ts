type Report = {
  id: string
  title: string
  user: {
    id: string
    ref: import('firebase-admin/firestore').DocumentReference
    name: string
    imageUrl: string | null
  }
  homeTeam: {
    id: string
    ref: import('firebase-admin/firestore').DocumentReference
    name: string
    shortName: string
    imageUrl: string
    score: number
  }
  awayTeam: {
    id: string
    ref: import('firebase-admin/firestore').DocumentReference
    name: string
    shortName: string
    imageUrl: string
    score: number
  }
  competition: {
    id: string
    ref: import('firebase-admin/firestore').DocumentReference
    name: string
  }
  jstDate: string
  match: {
    id: string
    ref: import('firebase-admin/firestore').DocumentReference
  }
  matchday: number
  selectTeam: 'home' | 'away' | 'both'
  momId: string
  summary: string
  teamIds: string[]
  publish: boolean
  frozen: boolean
  likeCount: number
  createdAt: import('firebase/firestore').FieldValue
}

type ReportItem = {
  id: string
  player: {
    id: string
    name: string
  }
  position: Position
  shirtNumber: number | null
  point: '6.0'
  text: string
  order: number
}
