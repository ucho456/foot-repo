import { doc, getDoc, QueryDocumentSnapshot, WriteBatch } from 'firebase/firestore'
import type { DocumentData, SnapshotOptions, FirestoreDataConverter } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import db from '@/plugins/firebase'

const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user: User): DocumentData {
    return {
      name: user.name,
      imageUrl: user.imageUrl,
      greet: user.greet,
      favoriteTeamId1: user.favoriteTeamId1,
      favoriteTeamId2: user.favoriteTeamId2,
      favoriteTeamId3: user.favoriteTeamId3
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): User {
    const data = snapshot.data(options)
    return {
      id: snapshot.id,
      name: data.name,
      imageUrl: data.imageUrl,
      greet: data.greet,
      favoriteTeamId1: data.favoriteTeamId1,
      favoriteTeamId2: data.favoriteTeamId2,
      favoriteTeamId3: data.favoriteTeamId3
    }
  }
}

export const getUserDoc = async (uid: string | undefined): Promise<User | null> => {
  if (!uid) return null
  const uRef = doc(db, 'users', uid).withConverter(userConverter)
  const uSnapshot = await getDoc(uRef)
  return uSnapshot.exists() ? uSnapshot.data() : null
}

export const createUserDoc = (batch: WriteBatch, uid: string, user: User): void => {
  const uRef = doc(db, 'users', uid).withConverter(userConverter)
  batch.set(uRef, {
    id: uid,
    name: user.name,
    imageUrl: user.imageUrl,
    greet: user.greet,
    favoriteTeamId1: user.favoriteTeamId1,
    favoriteTeamId2: user.favoriteTeamId2,
    favoriteTeamId3: user.favoriteTeamId3
  })
}

export const updateUserDoc = (batch: WriteBatch, uid: string, user: User): void => {
  const uRef = doc(db, 'users', uid).withConverter(userConverter)
  batch.update(uRef, {
    name: user.name,
    imageUrl: user.imageUrl,
    greet: user.greet,
    favoriteTeamId1: user.favoriteTeamId1,
    favoriteTeamId2: user.favoriteTeamId2,
    favoriteTeamId3: user.favoriteTeamId3
  })
}

export const uploadAndGetImageUrl = async (userImageFile: File): Promise<string> => {
  const storage = getStorage()
  const storageRef = ref(storage, `users/${new Date().getTime()}`)
  await uploadBytes(storageRef, userImageFile)
  const imageUrl = await getDownloadURL(storageRef)
  return imageUrl
}

// getUsersDoc, deleteUserDoc
