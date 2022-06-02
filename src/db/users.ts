import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { userConverter } from '@/utils/converters'

export const fetchUser = async (uid: string | undefined): Promise<User | null> => {
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
