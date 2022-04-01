import { doc, getDoc, QueryDocumentSnapshot, WriteBatch } from 'firebase/firestore'
import type { DocumentData, SnapshotOptions, FirestoreDataConverter } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import db from '@/plugins/firebase'

const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user: User): DocumentData {
    return {
      name: user.name,
      imageUrl: user.imageUrl
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): User {
    const data = snapshot.data(options)
    return {
      id: snapshot.id,
      name: data.name,
      imageUrl: data.imageUrl
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
  batch.set(uRef, { id: uid, name: user.name, imageUrl: user.imageUrl })
}

export const updateUserDoc = (batch: WriteBatch, uid: string, user: User): void => {
  const uRef = doc(db, 'users', uid).withConverter(userConverter)
  batch.update(uRef, { name: user.name, imageUrl: user.imageUrl })
}

export const uploadAndGetImageUrl = async (userImageFile: File): Promise<string> => {
  const storage = getStorage()
  const storageRef = ref(storage, `users/${new Date().getTime()}`)
  await uploadBytes(storageRef, userImageFile)
  const imageUrl = await getDownloadURL(storageRef)
  return imageUrl
}

// getUsersDoc, deleteUserDoc
