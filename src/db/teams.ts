/** check */
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { teamConverter } from '@/utils/converters'

/** Teams Read */
export const toStoreTeam = async (teamId: string, team: { data: Team | null }) => {
  const db = getFirestore()
  const tRef = doc(db, 'teams', teamId).withConverter(teamConverter)
  const tShanpshot = await getDoc(tRef)
  team.data = tShanpshot.exists() ? tShanpshot.data() : null
}

export const jLeagueTeams = [
  { id: '', name: '未選択' },
  { id: '5850', name: 'FC Tokyo' },
  { id: '5851', name: 'Gamba Osaka' },
  { id: '5852', name: 'Hokkaido Consadole Sapporo' }
]

export const premierLeagueTeams = [
  { id: '', name: '未選択' },
  { id: '65', name: 'Manchester City FC' },
  { id: '64', name: 'Liverpool FC' },
  { id: '61', name: 'Chelsea FC' },
  { id: '346', name: 'Watford FC' }
]

export const laLigaTeams = [
  { id: '', name: '未選択' },
  { id: '86', name: 'Real Madrid CF' },
  { id: '81', name: 'FC Barcelona' },
  { id: '559', name: 'Sevilla FC' }
]

export const serieATeams = [
  { id: '', name: '未選択' },
  { id: '100', name: 'AS Roma' },
  { id: '102', name: 'Atalanta BC' },
  { id: '103', name: 'Bologna FC 1909' }
]

export const bundesligaTeams = [
  { id: '', name: '未選択' },
  { id: '1', name: '1. FC Köln' },
  { id: '2', name: 'TSG 1899 Hoffenheim' },
  { id: '4', name: 'Borussia Dortmund' }
]

const allTeams = jLeagueTeams
  .concat(premierLeagueTeams)
  .concat(laLigaTeams)
  .concat(serieATeams)
  .concat(bundesligaTeams)
export const teamMap = new Map(allTeams.map((t) => [t.id, t]))
