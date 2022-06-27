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
    ref: import('firebase/firestore').DocumentReference
  }
  createdAt: import('firebase/firestore').FieldValue
}

type Follower = {
  id: string
  user: {
    id: string
    ref: import('firebase/firestore').DocumentReference
    name: string
    imageUrl: string | null
  }
  createdAt: import('firebase/firestore').FieldValue
}

type ViolationReporter = {
  user: {
    id: string
    ref: import('firebase/firestore').DocumentReference
  }
}
