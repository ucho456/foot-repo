import { doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { likeConverter, userConverter } from '@/utils/converters'

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

export const putFollow = async (userId: string): Promise<void> => {
  const functions = getFunctions(undefined, 'asia-northeast1')
  const updateFollow = httpsCallable(functions, 'updateFollow')
  await updateFollow({ userId })
}
