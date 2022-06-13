import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { teamConverter } from '@/utils/converters'

export const toStoreTeam = async (teamId: string, team: { data: Team | null }) => {
  const db = getFirestore()
  const tRef = doc(db, 'teams', teamId).withConverter(teamConverter)
  const tShanpshot = await getDoc(tRef)
  team.data = tShanpshot.exists() ? tShanpshot.data() : null
}
