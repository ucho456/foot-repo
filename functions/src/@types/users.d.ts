type User = {
  id: string
  name: string
  imageUrl: string | null
  greet: string
  competitionId: string
  team: {
    id: string
    name: string
  }
  reportCount: number
  followCount: number
  followerCount: number
}

type Like = {
  id: string
  report: {
    id: string
    ref: import('firebase-admin/firestore').DocumentReference
  }
  createdAt: import('firebase-admin/firestore').FieldValue
}

type Follower = {
  id: string
  user: {
    id: string
    ref: import('firebase-admin/firestore').DocumentReference
    name: string
    imageUrl: string | null
  }
}
