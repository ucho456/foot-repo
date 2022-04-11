import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  QueryDocumentSnapshot
  // WriteBatch
} from 'firebase/firestore'
import type { DocumentData, SnapshotOptions, FirestoreDataConverter } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const userProperties = (user: User) => {
  return {
    name: user.name,
    imageUrl: user.imageUrl,
    greet: user.greet,
    competitionId1: user.competitionId1,
    teamId1: user.teamId1,
    competitionId2: user.competitionId2,
    teamId2: user.teamId2,
    competitionId3: user.competitionId3,
    teamId3: user.teamId3
  }
}

const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user: User): DocumentData {
    return userProperties(user)
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): User {
    const data = snapshot.data(options)
    return {
      id: snapshot.id,
      name: data.name,
      imageUrl: data.imageUrl,
      greet: data.greet,
      competitionId1: data.competitionId1,
      teamId1: data.teamId1,
      competitionId2: data.competitionId2,
      teamId2: data.teamId1,
      competitionId3: data.competitionId3,
      teamId3: data.competitionId1
    }
  }
}

export const getUserDoc = async (uid: string | undefined): Promise<User | null> => {
  if (!uid) return null
  const db = getFirestore()
  const uRef = doc(db, 'users', uid).withConverter(userConverter)
  const uSnapshot = await getDoc(uRef)
  return uSnapshot.exists() ? uSnapshot.data() : null
}

export const createUserDoc = async (user: User): Promise<void> => {
  const db = getFirestore()
  const uRef = doc(db, 'users', user.id).withConverter(userConverter)
  await setDoc(uRef, { id: user.id, ...userProperties(user) })
}

// export const updateInitUserDoc = (batch: WriteBatch, uid: string, user: User): void => {
//   const db = getFirestore()
//   const uRef = doc(db, 'users', uid).withConverter(userConverter)
//   batch.update(uRef, userProperties(user))
// }

export const uploadAndGetImageUrl = async (userImageFile: File): Promise<string> => {
  const storage = getStorage()
  const storageRef = ref(storage, `users/${new Date().getTime()}`)
  await uploadBytes(storageRef, userImageFile)
  const imageUrl = await getDownloadURL(storageRef)
  return imageUrl
}

// getUsersDoc, deleteUserDoc
