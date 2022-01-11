import { reactive } from '@nuxtjs/composition-api'

interface PositionInfo {
  position: Position
  positionId: PositionId
}
interface ReportItemNoId {
  homeAway: HomeAway
  playerName: string
  position: Position
  positionId: PositionId
  shirtNumber: number
  point: number
  text: string
}

const makeLineup = (lineup: Player[], homeAway: HomeAway): ReportItemNoId[] => {
  return lineup
    .map((v) => {
      const { position, positionId } = omitPosition(v.position)
      return makeReportItem(v.name, v.shirtNumber, homeAway, position, positionId)
    })
    .sort((a, b) => (a.positionId > b.positionId ? 1 : -1))
}

const omitPosition = (p: DefaultPosition): PositionInfo => {
  return p === 'Goalkeeper'
    ? { position: 'GK', positionId: 1 }
    : p === 'Defender'
    ? { position: 'DF', positionId: 2 }
    : p === 'Midfielder'
    ? { position: 'MF', positionId: 3 }
    : { position: 'FW', positionId: 4 }
}

const makeReportItem = (
  playerName: string,
  shirtNumber: number,
  homeAway: HomeAway,
  position: Position,
  positionId: PositionId
): ReportItemNoId => {
  return { homeAway, playerName, position, positionId, shirtNumber, point: 6.5, text: '' }
}

const makeSubstitutions = (
  substitutions: Substitution[],
  bench: Player[],
  homeAway: HomeAway
): ReportItemNoId[] => {
  const substitutionIds = substitutions.map((v) => v.playerIn.id)
  return bench
    .filter((v) => substitutionIds.includes(v.id))
    .map((v) => {
      const { position, positionId } = omitPosition(v.position)
      return makeReportItem(v.name, v.shirtNumber, homeAway, position, positionId)
    })
}

const setUpReportItems = (
  match: Match
): { homeTeamReportItems: ReportItem[]; awayTeamReportItems: ReportItem[] } => {
  const homeTeam = match.homeTeam
  const awayTeam = match.awayTeam
  const homeLineup = makeLineup(homeTeam.lineup, 'home')
  const awayLineup = makeLineup(awayTeam.lineup, 'away')
  const substitutions = match.substitutions
  const homeSubstitutions = makeSubstitutions(substitutions, homeTeam.bench, 'home')
  const awaySubstitutions = makeSubstitutions(substitutions, awayTeam.bench, 'away')
  const homeCoach = makeReportItem(homeTeam.coach.name, 0, 'home', 'HC', 5)
  const awayCoach = makeReportItem(awayTeam.coach.name, 0, 'away', 'HC', 5)
  homeSubstitutions.push(homeCoach)
  awaySubstitutions.push(awayCoach)
  const homeTeamReportItems = homeLineup.concat(homeSubstitutions).map((v, i) => {
    return { ...v, id: i + 1 }
  })
  const awayTeamReportItems = awayLineup.concat(awaySubstitutions).map((v, i) => {
    return { ...v, id: i + 100 }
  })
  return { homeTeamReportItems, awayTeamReportItems }
}

export const setUpReport = (match: Match): Report => {
  const { homeTeamReportItems, awayTeamReportItems } = setUpReportItems(match)
  return reactive({
    matchId: match.id,
    competitionId: match.competition.id,
    competitionName: match.competition.name,
    seasonId: match.season.id,
    seasonStartDate: match.season.startDate,
    seasonEndDate: match.season.endDate,
    utcDate: match.utcDate,
    formatType: 'Home team only',
    homeTeamId: match.homeTeam.id,
    homeTeamName: match.homeTeam.name,
    homeTeamScore: match.score.fullTime.homeTeam,
    homeTeamReportItems,
    awayTeamId: match.awayTeam.id,
    awayTeamName: match.awayTeam.name,
    awayTeamScore: match.score.fullTime.awayTeam,
    awayTeamReportItems
  })
}
