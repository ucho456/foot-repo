import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import type {
  DocumentData,
  FirestoreDataConverter,
  SnapshotOptions,
  QueryDocumentSnapshot
} from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user: User): DocumentData {
    return {
      name: user.name,
      imageUrl: user.imageUrl,
      greet: user.greet,
      competitionId: user.competitionId,
      teamId: user.teamId
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): User {
    const data = snapshot.data(options)
    return {
      id: snapshot.id,
      name: data.name,
      imageUrl: data.imageUrl,
      greet: data.greet,
      competitionId: data.competitionId,
      teamId: data.teamId
    }
  }
}

export const getUser = async (uid: string | undefined): Promise<User | null> => {
  if (!uid) return null
  const db = getFirestore()
  const uRef = doc(db, 'users', uid).withConverter(userConverter)
  const uSnapshot = await getDoc(uRef)
  return uSnapshot.exists() ? uSnapshot.data() : null
}

export const createUser = async (user: User): Promise<void> => {
  const db = getFirestore()
  const uRef = doc(db, 'users', user.id).withConverter(userConverter)
  await setDoc(uRef, {
    id: user.id,
    name: user.name,
    imageUrl: user.imageUrl,
    greet: user.greet,
    competitionId: user.competitionId,
    teamId: user.teamId
  })
}

export const uploadAndGetImageUrl = async (userImageFile: File): Promise<string> => {
  const storage = getStorage()
  const storageRef = ref(storage, `users/${new Date().getTime()}`)
  await uploadBytes(storageRef, userImageFile)
  const imageUrl = await getDownloadURL(storageRef)
  return imageUrl
}
