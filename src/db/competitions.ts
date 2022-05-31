import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { scorersConverter, standingsConverter } from '@/utils/converters'

export const competitionMap = new Map([
  [
    'J-League',
    {
      id: 'J-League',
      name: 'J. League',
      imageUrl: require('@/assets/JJL.jpg') as string,
      type: 'league',
      to: '/databases/leagues/J-League'
    }
  ],
  [
    'Premier-League',
    {
      id: 'Premier-League',
      name: 'Premier League',
      imageUrl: 'https://crests.football-data.org/PL.png',
      type: 'league',
      to: '/databases/leagues/Premier-League'
    }
  ],
  [
    'La-Liga',
    {
      id: 'La-Liga',
      name: 'La Liga',
      imageUrl: 'https://crests.football-data.org/PD.png',
      type: 'league',
      to: '/databases/leagues/La-Liga'
    }
  ],
  [
    'Serie-A',
    {
      id: 'Serie-A',
      name: 'Serie A',
      imageUrl: 'https://crests.football-data.org/SA.png',
      type: 'league',
      to: '/databases/leagues/Serie-A'
    }
  ],
  [
    'Bundesliga',
    {
      id: 'Bundesliga',
      name: 'Bundesliga',
      imageUrl: 'https://crests.football-data.org/BL1.png',
      type: 'league',
      to: '/databases/leagues/Bundesliga'
    }
  ]
])

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
