import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { scorersConverter, standingsConverter } from '@/utils/converters'

export const getScores = async (databases: {
  competitionId: string
  standings: Standings | null
  scorers: Scorers | null
  matches: Match[]
  season: string
  yearMonth: string
}): Promise<void> => {
  const db = getFirestore()
  const sRef = doc(
    db,
    'competitions',
    databases.competitionId,
    'scorers',
    databases.season
  ).withConverter(scorersConverter)
  const sSnapshot = await getDoc(sRef)
  databases.scorers = sSnapshot.exists() ? sSnapshot.data() : null
}

export const getStandings = async (databases: {
  competitionId: string
  standings: Standings | null
  scorers: Scorers | null
  matches: Match[]
  season: string
  yearMonth: string
}): Promise<void> => {
  const db = getFirestore()
  const sRef = doc(
    db,
    'competitions',
    databases.competitionId,
    'standings',
    databases.season
  ).withConverter(standingsConverter)
  const sSnapshot = await getDoc(sRef)
  databases.standings = sSnapshot.exists() ? sSnapshot.data() : null
}
