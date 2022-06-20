import { doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore'
import { userConverter } from '@/utils/converters'

export const fetchUser = async (uid: string | undefined): Promise<User | null> => {
  if (!uid) return null
  const db = getFirestore()
  const uRef = doc(db, 'users', uid).withConverter(userConverter)
  const uSnapshot = await getDoc(uRef)
  return uSnapshot.exists() ? uSnapshot.data() : null
}

export const createUser = async (inputUser: InputUser): Promise<void> => {
  const db = getFirestore()
  const uRef = doc(db, 'users', inputUser.id).withConverter(userConverter)
  await setDoc(uRef, {
    id: inputUser.id,
    name: inputUser.name,
    imageUrl: inputUser.imageUrl,
    greet: inputUser.greet,
    competitionId: inputUser.competitionId,
    team: inputUser.team
  })
}

export const updateUser = async (inputUser: InputUser): Promise<void> => {
  const db = getFirestore()
  const uRef = doc(db, 'users', inputUser.id).withConverter(userConverter)
  await updateDoc(uRef, {
    name: inputUser.name,
    imageUrl: inputUser.imageUrl,
    greet: inputUser.greet,
    competitionId: inputUser.competitionId,
    team: inputUser.team
  })
}
