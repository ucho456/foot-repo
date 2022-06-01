import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { teamConverter } from '@/utils/converters'
import useStore from '@/utils/useStore'

export const setTeam = async (teamId: string) => {
  const { team } = useStore()
  const db = getFirestore()
  const tRef = doc(db, 'teams', teamId).withConverter(teamConverter)
  const tShanpshot = await getDoc(tRef)
  team.data = tShanpshot.exists() ? tShanpshot.data() : null
}
