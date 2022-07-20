/** check */
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
  follow?: boolean
}

type Like = {
  id: string
  report: {
    id: string
    ref: import('firebase/firestore/lite').DocumentReference
  }
  createdAt: import('firebase/firestore/lite').FieldValue
}

type Follower = {
  id: string
  user: {
    id: string
    ref: import('firebase/firestore/lite').DocumentReference
    name: string
    imageUrl: string | null
  }
  createdAt: import('firebase/firestore/lite').FieldValue
  follow?: boolean
}

type ViolationReporter = {
  user: {
    id: string
    ref: import('firebase/firestore/lite').DocumentReference
  }
}
