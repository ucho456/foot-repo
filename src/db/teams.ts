/** check */
import { doc, getDoc, getFirestore } from 'firebase/firestore/lite'
import { teamConverter } from '@/utils/converters'

/** Teams Read */
export const toStoreTeam = async (teamId: string, team: { data: Team | null }) => {
  const db = getFirestore()
  const tRef = doc(db, 'teams', teamId).withConverter(teamConverter)
  const tShanpshot = await getDoc(tRef)
  team.data = tShanpshot.exists() ? tShanpshot.data() : null
}

export const worldCupTeams = [{ id: '', name: '未選択' }]

export const championsLeagueTeams = [{ id: '', name: '未選択' }]

export const premierLeagueTeams = [
  { id: '', name: '未選択' },
  { id: '1044', name: 'AFC Bournemouth' },
  { id: '57', name: 'Arsenal FC' },
  { id: '58', name: 'Aston Villa FC' },
  { id: '402', name: 'Brentford FC' },
  { id: '397', name: 'Brighton & Hove Albion FC' },
  { id: '61', name: 'Chelsea FC' },
  { id: '354', name: 'Crystal Palace FC' },
  { id: '62', name: 'Everton FC' },
  { id: '63', name: 'Fulham FC' },
  { id: '341', name: 'Leeds United FC' },
  { id: '338', name: 'Leicester City FC' },
  { id: '64', name: 'Liverpool FC' },
  { id: '65', name: 'Manchester City FC' },
  { id: '66', name: 'Manchester United FC' },
  { id: '67', name: 'Newcastle United FC' },
  { id: '351', name: 'Nottingham Forest FC' },
  { id: '340', name: 'Southampton FC' },
  { id: '73', name: 'Tottenham Hotspur FC' },
  { id: '563', name: 'West Ham United FC' },
  { id: '76', name: 'Wolverhampton Wanderers FC' }
]

export const laLigaTeams = [
  { id: '', name: '未選択' },
  { id: '77', name: 'Athletic Club' },
  { id: '79', name: 'CA Osasuna' },
  { id: '264', name: 'Cádiz CF' },
  { id: '78', name: 'Club Atlético de Madrid' },
  { id: '285', name: 'Elche CF' },
  { id: '81', name: 'FC Barcelona' },
  { id: '82', name: 'Getafe CF' },
  { id: '298', name: 'Girona FC' },
  { id: '87', name: 'Rayo Vallecano de Madrid' },
  { id: '558', name: 'RC Celta de Vigo' },
  { id: '80', name: 'RCD Espanyol de Barcelona' },
  { id: '89', name: 'RCD Mallorca' },
  { id: '90', name: 'Real Betis Balompié' },
  { id: '86', name: 'Real Madrid CF' },
  { id: '92', name: 'Real Sociedad de Fútbol' },
  { id: '250', name: 'Real Valladolid CF' },
  { id: '559', name: 'Sevilla FC' },
  { id: '267', name: 'UD Almería' },
  { id: '95', name: 'Valencia CF' },
  { id: '94', name: 'Villarreal CF' }
]

export const serieATeams = [
  { id: '', name: '未選択' },
  { id: '98', name: 'AC Milan' },
  { id: '5911', name: 'AC Monza' },
  { id: '99', name: 'ACF Fiorentina' },
  { id: '100', name: 'AS Roma' },
  { id: '102', name: 'Atalanta BC' },
  { id: '103', name: 'Bologna FC 1909' },
  { id: '445', name: 'Empoli FC' },
  { id: '108', name: 'FC Internazionale Milano' },
  { id: '450', name: 'Hellas Verona FC' },
  { id: '109', name: 'Juventus FC' },
  { id: '488', name: 'Spezia Calcio' },
  { id: '110', name: 'SS Lazio' },
  { id: '113', name: 'SSC Napoli' },
  { id: '586', name: 'Torino FC' },
  { id: '584', name: 'UC Sampdoria' },
  { id: '115', name: 'Udinese Calcio' },
  { id: '457', name: 'US Cremonese' },
  { id: '5890', name: 'US Lecce' },
  { id: '455', name: 'US Salernitana 1919' },
  { id: '471', name: 'US Sassuolo Calcio' }
]

export const bundesligaTeams = [
  { id: '', name: '未選択' },
  { id: '1', name: '1. FC Köln' },
  { id: '28', name: '1. FC Union Berlin' },
  { id: '15', name: '1. FSV Mainz 05' },
  { id: '3', name: 'Bayer 04 Leverkusen' },
  { id: '4', name: 'Borussia Dortmund' },
  { id: '18', name: 'Borussia Mönchengladbach' },
  { id: '19', name: 'Eintracht Frankfurt' },
  { id: '16', name: 'FC Augsburg' },
  { id: '5', name: 'FC Bayern München' },
  { id: '6', name: 'FC Schalke 04' },
  { id: '9', name: 'Hertha BSC' },
  { id: '721', name: 'RB Leipzig' },
  { id: '17', name: 'SC Freiburg' },
  { id: '12', name: 'SV Werder Bremen' },
  { id: '2', name: 'TSG 1899 Hoffenheim' },
  { id: '10', name: 'VfB Stuttgart' },
  { id: '36', name: 'VfL Bochum 1848' },
  { id: '11', name: 'VfL Wolfsburg' }
]

export const ligue1Teams = [
  { id: '', name: '未選択' },
  { id: '510', name: 'AC Ajaccio' },
  { id: '519', name: 'AJ Auxerre' },
  { id: '532', name: 'Angers SCO' },
  { id: '548', name: 'AS Monaco FC' },
  { id: '541', name: 'Clermont Foot 63' },
  { id: '531', name: 'ES Troyes AC' },
  { id: '525', name: 'FC Lorient' },
  { id: '543', name: 'FC Nantes' },
  { id: '521', name: 'Lille OSC' },
  { id: '518', name: 'Montpellier HSC' },
  { id: '522', name: 'OGC Nice' },
  { id: '516', name: 'Olympique de Marseille' },
  { id: '523', name: 'Olympique Lyonnais' },
  { id: '524', name: 'Paris Saint-Germain FC' },
  { id: '546', name: 'Racing Club de Lens' },
  { id: '576', name: 'RC Strasbourg Alsace' },
  { id: '512', name: 'Stade Brestois 29' },
  { id: '547', name: 'Stade de Reims' },
  { id: '529', name: 'Stade Rennais FC 1901' },
  { id: '511', name: 'Toulouse FC' }
]

const allTeams = worldCupTeams
  .concat(championsLeagueTeams)
  .concat(premierLeagueTeams)
  .concat(laLigaTeams)
  .concat(serieATeams)
  .concat(bundesligaTeams)
export const teamMap = new Map(allTeams.map((t) => [t.id, t]))
