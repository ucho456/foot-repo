import { reactive } from '@nuxtjs/composition-api'

const makeReportItem = (
  id: number,
  playerName: string,
  shirtNumber: number,
  homeAway: ReportHomeAway,
  positionId: ReportPositionId,
  position: ReportPosition
): ReportItem => {
  return { id, homeAway, playerName, position, positionId, shirtNumber, point: '6.5', text: '' }
}

const makeLineup = (lineup: MatchPlayer[], homeAway: ReportHomeAway): ReportItem[] => {
  return lineup
    .map((l) => makeReportItem(l.id, l.name, l.shirtNumber, homeAway, l.positionId, l.position))
    .sort((a, b) => (a.positionId > b.positionId ? 1 : -1))
}

const makeSubstitutions = (bench: MatchPlayer[], homeAway: ReportHomeAway): ReportItem[] => {
  return bench
    .filter((b) => b.in !== 0)
    .map((b) => makeReportItem(b.id, b.name, b.shirtNumber, homeAway, b.positionId, b.position))
}

const setUpReportItems = (
  match: Match
): { homeTeamReportItems: ReportItem[]; awayTeamReportItems: ReportItem[] } => {
  const homeTeam = match.homeTeam
  const awayTeam = match.awayTeam
  const homeLineup = makeLineup(homeTeam.lineup, 'home')
  const awayLineup = makeLineup(awayTeam.lineup, 'away')
  const homeSubstitutions = makeSubstitutions(homeTeam.bench, 'home')
  const awaySubstitutions = makeSubstitutions(awayTeam.bench, 'away')
  const homeCoach = makeReportItem(homeTeam.coach.id, homeTeam.coach.name, 0, 'home', 5, 'HC')
  const awayCoach = makeReportItem(awayTeam.coach.id, awayTeam.coach.name, 0, 'away', 5, 'HC')
  homeSubstitutions.push(homeCoach)
  awaySubstitutions.push(awayCoach)
  const homeTeamReportItems = homeLineup.concat(homeSubstitutions)
  const awayTeamReportItems = awayLineup.concat(awaySubstitutions)
  return { homeTeamReportItems, awayTeamReportItems }
}

export const setUpReport = (match: Match, user: User | GuestUser): Report => {
  const { homeTeamReportItems, awayTeamReportItems } = setUpReportItems(match)
  return reactive({
    id: 0,
    title: `${match.homeTeam.name} vs ${match.awayTeam.name} の選手採点`,
    userId: user.id,
    guestName: user.id === 0 ? user.name : '',
    matchId: match.id,
    competitionId: match.competitionId,
    competitionName: match.competitionName,
    seasonId: match.seasonId,
    season: match.season,
    utcDate: match.utcDate,
    selectTeam: 'Home team only',
    homeTeamId: match.homeTeam.id,
    homeTeamName: match.homeTeam.name,
    homeTeamScore: match.homeTeamScore,
    homeTeamPenalty: match.homeTeamPenalty,
    homeTeamReportItems,
    awayTeamId: match.awayTeam.id,
    awayTeamName: match.awayTeam.name,
    awayTeamScore: match.awayTeamScore,
    awayTeamPenalty: match.awayTeamPenalty,
    awayTeamReportItems,
    summary: '',
    mom: ''
  })
}

export const inputPoint = (
  report: Report,
  point: ReportPoint,
  homeAway: ReportHomeAway,
  index: number
): void => {
  homeAway === 'home'
    ? (report.homeTeamReportItems[index].point = point)
    : (report.awayTeamReportItems[index].point = point)
}

export const inputText = (
  report: Report,
  text: string,
  homeAway: ReportHomeAway,
  index: number
): void => {
  homeAway === 'home'
    ? (report.homeTeamReportItems[index].text = text)
    : (report.awayTeamReportItems[index].text = text)
}
