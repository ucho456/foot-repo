import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where
} from 'firebase/firestore'
import type { QueryDocumentSnapshot } from 'firebase/firestore'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { followerConverter, likeConverter, userConverter } from '@/utils/converters'

export const createUser = async (inputUser: InputUser): Promise<void> => {
  const db = getFirestore()
  const uRef = doc(db, 'users', inputUser.id).withConverter(userConverter)
  await setDoc(uRef, {
    id: inputUser.id,
    name: inputUser.name,
    imageUrl: inputUser.imageUrl,
    greet: inputUser.greet,
    competitionId: inputUser.competitionId,
    team: inputUser.team,
    reportCount: 0,
    followCount: 0,
    followerCount: 0
  })
}

export const fetchUser = async (uid: string | undefined): Promise<User | null> => {
  if (!uid) {
    return null
  }
  const db = getFirestore()
  const uRef = doc(db, 'users', uid).withConverter(userConverter)
  const uSnapshot = await getDoc(uRef)
  return uSnapshot.exists() ? uSnapshot.data() : null
}

export const updateUser = async (inputUser: InputUser): Promise<void> => {
  const db = getFirestore()
  const uRef = doc(db, 'users', inputUser.id).withConverter(userConverter)
  await updateDoc(uRef, {
    [`greet`]: inputUser.greet,
    [`competitionId`]: inputUser.competitionId,
    [`team`]: inputUser.team
  })
}

export const fetchLike = async (uid: string, reportId: string): Promise<boolean> => {
  const db = getFirestore()
  const lRef = doc(db, 'users', uid, 'likes', reportId).withConverter(likeConverter)
  const lSnapshot = await getDoc(lRef)
  return lSnapshot.exists()
}

export const fetchFollow = async (uid: string, userId: string): Promise<boolean> => {
  const db = getFirestore()
  const uRef = doc(db, 'users', uid, 'follows', userId).withConverter(followerConverter)
  const uSnapshot = await getDoc(uRef)
  return uSnapshot.exists()
}

export const putFollow = async (userId: string): Promise<void> => {
  const functions = getFunctions(undefined, 'asia-northeast1')
  const updateFollow = httpsCallable(functions, 'updateFollow')
  await updateFollow({ userId })
}

const perPage = 10
export const fetchFollows = async (
  userId: string,
  lastVisible: QueryDocumentSnapshot<Follower> | null,
  loginUser: LoginUser | null
): Promise<{
  resFollows: Follower[]
  resLastVisible: QueryDocumentSnapshot<Follower>
}> => {
  const db = getFirestore()
  const fRef = collection(db, 'users', userId, 'follows').withConverter(followerConverter)
  const q = lastVisible
    ? query(fRef, orderBy('createdAt', 'desc'), startAfter(lastVisible), limit(perPage))
    : query(fRef, orderBy('createdAt', 'desc'), limit(perPage))
  const fSnapshot = await getDocs(q)
  let resFollows: Follower[] = []
  const followIds: string[] = []
  fSnapshot.forEach((doc) => {
    if (doc.exists()) {
      resFollows.push(doc.data())
      followIds.push(doc.data().id)
    }
  })
  const resLastVisible = fSnapshot.docs[fSnapshot.docs.length - 1]
  if (loginUser && followIds.length > 0) {
    const myFRef = collection(db, 'users', loginUser.uid, 'follows').withConverter(
      followerConverter
    )
    const q = query(myFRef, where(documentId(), 'in', followIds))
    const myFSnapshot = await getDocs(q)
    const map: Map<string, Follower> = new Map()
    myFSnapshot.forEach((doc) => {
      if (doc.exists()) map.set(doc.data().id, doc.data())
    })
    resFollows = resFollows.map((f) => {
      return { ...f, follow: map.has(f.id) }
    })
  }
  return { resFollows, resLastVisible }
}

export const fetchFollowers = async (
  userId: string,
  lastVisible: QueryDocumentSnapshot<Follower> | null,
  loginUser: LoginUser | null
): Promise<{
  resFollowers: Follower[]
  resLastVisible: QueryDocumentSnapshot<Follower>
}> => {
  const db = getFirestore()
  const fRef = collection(db, 'users', userId, 'followers').withConverter(followerConverter)
  const q = lastVisible
    ? query(fRef, orderBy('createdAt', 'desc'), startAfter(lastVisible), limit(perPage))
    : query(fRef, orderBy('createdAt', 'desc'), limit(perPage))
  const fSnapshot = await getDocs(q)
  let resFollowers: Follower[] = []
  const followerIds: string[] = []
  fSnapshot.forEach((doc) => {
    if (doc.exists()) {
      resFollowers.push(doc.data())
      followerIds.push(doc.data().id)
    }
  })
  const resLastVisible = fSnapshot.docs[fSnapshot.docs.length - 1]
  if (loginUser && followerIds.length > 0) {
    const fRef = collection(db, 'users', loginUser.uid, 'follows').withConverter(followerConverter)
    const q = query(fRef, where(documentId(), 'in', followerIds))
    const fSnapshot = await getDocs(q)
    const map: Map<string, Follower> = new Map()
    fSnapshot.forEach((doc) => {
      if (doc.exists()) map.set(doc.data().id, doc.data())
    })
    resFollowers = resFollowers.map((f) => {
      return { ...f, follow: map.has(f.id) }
    })
  }
  return { resFollowers, resLastVisible }
}
