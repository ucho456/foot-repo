export const jLeagueTeams = [
  { id: '5850', name: 'FC Tokyo' },
  { id: '5851', name: 'Gamba Osaka' },
  { id: '5852', name: 'Hokkaido Consadole Sapporo' }
]

export const premierLeagueTeams = [
  { id: '65', name: 'Manchester City FC' },
  { id: '64', name: 'Liverpool FC' },
  { id: '61', name: 'Chelsea FC' },
  { id: '346', name: 'Watford FC' }
]

export const laLigaTeams = [
  { id: '86', name: 'Real Madrid CF' },
  { id: '81', name: 'FC Barcelona' },
  { id: '559', name: 'Sevilla FC' }
]

export const serieATeams = [
  { id: '100', name: 'AS Roma' },
  { id: '102', name: 'Atalanta BC' },
  { id: '103', name: 'Bologna FC 1909' }
]

export const bundesligaTeams = [
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
