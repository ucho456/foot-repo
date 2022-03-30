import { doc, getDoc, QueryDocumentSnapshot, WriteBatch } from 'firebase/firestore'
import type { DocumentData, SnapshotOptions, FirestoreDataConverter } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import db from '@/plugins/firebase'

const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user: User): DocumentData {
    return {
      name: user.name,
      photoUrl: user.photoUrl
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): User {
    const data = snapshot.data(options)
    return {
      id: snapshot.id,
      name: data.name,
      photoUrl: data.photoUrl
    }
  }
}

export const fetchUserDoc = async (uid: string): Promise<User | null> => {
  const uRef = doc(db, 'users', uid).withConverter(userConverter)
  const uSnapshot = await getDoc(uRef)
  return uSnapshot.exists() ? uSnapshot.data() : null
}

export const createUserDoc = (batch: WriteBatch, uid: string, user: User): void => {
  const uRef = doc(db, 'users', uid).withConverter(userConverter)
  batch.set(uRef, { id: uid, name: user.name, photoUrl: user.photoUrl })
}

export const updateUserDoc = (batch: WriteBatch, uid: string, user: User): void => {
  const uRef = doc(db, 'users', uid).withConverter(userConverter)
  batch.update(uRef, { name: user.name, photoUrl: user.photoUrl })
}

export const uploadAndGetPhotoUrl = async (userPhotoFile: File): Promise<string> => {
  const storage = getStorage()
  const storageRef = ref(storage, `users/${new Date().getTime()}`)
  await uploadBytes(storageRef, userPhotoFile)
  const photoUrl = await getDownloadURL(storageRef)
  return photoUrl
}

// fetchUsersDoc, deleteUserDoc
