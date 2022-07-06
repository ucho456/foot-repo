/** check */
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
  yearMonth: string
  match: {
    id: string
    ref: import('firebase-admin/firestore').DocumentReference
  }
  matchday: number
  selectTeam: HomeAway
  momId: string
  summary: string
  teamIds: string[]
  publish: boolean
  frozen: boolean
  likeCount: number
  createdAt: import('firebase-admin/firestore').FieldValue
}

type ReportItem = {
  id: string
  user: {
    id: string
    ref: import('firebase-admin/firestore').DocumentReference
  }
  player: {
    id: string
    name: string
  }
  position: Position
  shirtNumber: number | null
  point: string
  text: string
  order: number
}

type ReportComment = {
  id: string
  user: {
    id: string
    ref: import('firebase-admin/firestore').DocumentReference
    name: string
    imageUrl: string | null
  }
  text: string
  createdAt: import('firebase-admin/firestore').FieldValue
}
