/** check */
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAfter,
  updateDoc,
  where,
  writeBatch
} from 'firebase/firestore'
import type { QueryDocumentSnapshot } from 'firebase/firestore'
import { followerConverter, likeConverter, userConverter } from '@/utils/converters'
const perPage = 10

/** Users Create */
export const postUser = async (newUser: InputUser): Promise<void> => {
  const db = getFirestore()
  const uRef = doc(db, 'users', newUser.id).withConverter(userConverter)
  await setDoc(uRef, {
    id: newUser.id,
    name: newUser.name,
    imageUrl: newUser.imageUrl,
    greet: newUser.greet,
    competitionId: newUser.competitionId,
    team: newUser.team,
    reportCount: 0,
    followCount: 0,
    followerCount: 0
  })
}

/** Users Read */
export const fetchUser = async (userId: string): Promise<User | null> => {
  const db = getFirestore()
  const uRef = doc(db, 'users', userId).withConverter(userConverter)
  const uSnapshot = await getDoc(uRef)
  return uSnapshot.exists() ? uSnapshot.data() : null
}

export const toStoreUsers = async (
  users: {
    data: User[]
    lastVisible: QueryDocumentSnapshot<User> | null
    searchOption: SearchOption
    hasNext: boolean
  },
  loginUser: LoginUser | null
): Promise<void> => {
  const db = getFirestore()
  const uRef = collection(db, 'users').withConverter(userConverter)
  const options = []
  if (users.searchOption.competitionId) {
    options.push(where('competitionId', '==', users.searchOption.competitionId))
  }
  if (users.searchOption.teamId) {
    options.push(where('team.id', '==', users.searchOption.teamId))
  }
  if (loginUser) options.push(where(documentId(), '!=', loginUser.uid))
  const q = users.lastVisible
    ? query(uRef, ...options, startAfter(users.lastVisible), limit(perPage))
    : query(uRef, ...options, limit(perPage))
  const uSnapshot = await getDocs(q)
  const userIds: string[] = []
  uSnapshot.forEach((doc) => {
    if (doc.exists() && doc.id !== 'guest') {
      users.data.push(doc.data())
      userIds.push(doc.data().id)
    }
  })
  users.lastVisible = uSnapshot.docs[uSnapshot.size - 1]
  if (userIds.length < perPage) users.hasNext = false
  if (loginUser && userIds.length > 0) {
    const fRef = collection(db, 'users', loginUser.uid, 'follows').withConverter(followerConverter)
    const q = query(fRef, where(documentId(), 'in', userIds))
    const fSnapshot = await getDocs(q)
    const map: Map<string, Follower> = new Map()
    fSnapshot.forEach((doc) => {
      if (doc.exists()) map.set(doc.data().id, doc.data())
    })
    users.data = users.data.map((u) => {
      return { ...u, follow: map.has(u.id) }
    })
  }
}

/** Users Update */
export const putUser = async (editUser: InputUser): Promise<void> => {
  const db = getFirestore()
  const uRef = doc(db, 'users', editUser.id).withConverter(userConverter)
  await updateDoc(uRef, {
    [`greet`]: editUser.greet,
    [`competitionId`]: editUser.competitionId,
    [`team`]: editUser.team
  })
}

/** Followers Read */
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
  const resLastVisible = fSnapshot.docs[fSnapshot.size - 1]
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

/** Follows Read */
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
  const resLastVisible = fSnapshot.docs[fSnapshot.size - 1]
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

export const fetchIsFollow = async (uid: string, userId: string): Promise<boolean> => {
  const db = getFirestore()
  const uRef = doc(db, 'users', uid, 'follows', userId).withConverter(followerConverter)
  const uSnapshot = await getDoc(uRef)
  return uSnapshot.exists()
}

/** Follow (not support offline) */
export const doFollow = async (uid: string, userId: string): Promise<void> => {
  const db = getFirestore()
  const meRef = doc(db, 'users', uid).withConverter(userConverter)
  const meFollowRef = doc(db, 'users', uid, 'follows', userId).withConverter(followerConverter)
  const youRef = doc(db, 'users', userId).withConverter(userConverter)
  const youFollowerRef = doc(db, 'users', userId, 'followers', uid).withConverter(followerConverter)
  const batch = writeBatch(db)
  const meSnapshot = await getDoc(meRef)
  const youSnapshot = await getDoc(youRef)
  if (!meSnapshot.exists() || !youSnapshot.exists()) throw new Error('Not Found')
  const followSnapshot = await getDoc(meFollowRef)
  if (followSnapshot.exists()) {
    batch.update(meRef, { [`followCount`]: increment(-1) })
    batch.delete(meFollowRef)
    batch.update(youRef, { [`followerCount`]: increment(-1) })
    batch.delete(youFollowerRef)
  } else {
    batch.update(meRef, { [`followCount`]: increment(1) })
    const you = youSnapshot.data()
    batch.set(meFollowRef, {
      id: userId,
      user: { id: userId, ref: youRef, name: you.name, imageUrl: you.imageUrl },
      createdAt: serverTimestamp()
    })
    batch.update(youRef, { [`followerCount`]: increment(1) })
    const me = meSnapshot.data()
    batch.set(youFollowerRef, {
      id: uid,
      user: { id: uid, ref: meRef, name: me.name, imageUrl: me.imageUrl },
      createdAt: serverTimestamp()
    })
  }
  await batch.commit()
}

/** Likes Read */
export const fetchIsLike = async (uid: string, reportId: string): Promise<boolean> => {
  const db = getFirestore()
  const lRef = doc(db, 'users', uid, 'likes', reportId).withConverter(likeConverter)
  const lSnapshot = await getDoc(lRef)
  return lSnapshot.exists()
}
