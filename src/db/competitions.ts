/** check */
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { scorersConverter, standingsConverter } from '@/utils/converters'

/** Scorers Read */
export const toStoreScorers = async (league: {
  competitionId: string
  scorers: Scorers | null
  season: string
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

/** Staindings Read */
export const toStoreStandings = async (league: {
  competitionId: string
  standings: Standings | null
  season: string
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

export const competitionMap = new Map([
  [
    'J-League',
    {
      id: 'J-League',
      name: 'J. League',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/foot-repo.appspot.com/o/JJL.jpg?alt=media&token=1625822d-a6dc-4bb9-a018-23506a19fbd3',
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
  ],
  [
    'Ligue-1',
    {
      id: 'Ligue-1',
      name: 'Ligue 1',
      imageUrl: 'https://crests.football-data.org/FL1.png',
      type: 'league',
      to: '/databases/leagues/Ligue-1'
    }
  ],
  [
    'Champions-League',
    {
      id: 'Champions-League',
      name: 'Champions League',
      imageUrl: 'https://crests.football-data.org/CL.png',
      type: 'cup',
      to: '/databases/cups/Champions-League'
    }
  ],
  [
    'World-Cup',
    {
      id: 'World-Cup',
      name: 'World Cup',
      imageUrl: 'https://crests.football-data.org/qatar.png',
      type: 'cup',
      to: '/databases/cups/World-Cup'
    }
  ]
])
