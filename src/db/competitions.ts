import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { scorersConverter, standingsConverter } from '@/utils/converters'

export const getScores = async (league: {
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
    league.competitionId,
    'scorers',
    league.season
  ).withConverter(scorersConverter)
  const sSnapshot = await getDoc(sRef)
  league.scorers = sSnapshot.exists() ? sSnapshot.data() : null
}

export const getStandings = async (league: {
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
    league.competitionId,
    'standings',
    league.season
  ).withConverter(standingsConverter)
  const sSnapshot = await getDoc(sRef)
  league.standings = sSnapshot.exists() ? sSnapshot.data() : null
}
