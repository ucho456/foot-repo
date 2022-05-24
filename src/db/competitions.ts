import { Ref } from '@nuxtjs/composition-api'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { scorersConverter, standingsConverter } from '@/utils/converters'

export const getScores = async (
  competitionId: string,
  season: string,
  scorers: Ref<Scorers | null>
): Promise<void> => {
  const db = getFirestore()
  const sRef = doc(db, 'competitions', competitionId, 'scorers', season).withConverter(
    scorersConverter
  )
  const sSnapshot = await getDoc(sRef)
  scorers.value = sSnapshot.exists() ? sSnapshot.data() : null
}

export const getStandings = async (
  competitionId: string,
  season: string,
  standings: Ref<Standings | null>
): Promise<void> => {
  const db = getFirestore()
  const sRef = doc(db, 'competitions', competitionId, 'standings', season).withConverter(
    standingsConverter
  )
  const sSnapshot = await getDoc(sRef)
  standings.value = sSnapshot.exists() ? sSnapshot.data() : null
}
