import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { scorersConverter, standingsConverter } from '@/utils/converters'

export const setScores = async (league: {
  competitionId: string
  standings: Standings | null
  scorers: Scorers | null
  matchSchedule: Match[]
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

export const setStandings = async (league: {
  competitionId: string
  standings: Standings | null
  scorers: Scorers | null
  matchSchedule: Match[]
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
