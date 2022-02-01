type ReportHomeAway = 'home' | 'away'

type ReportPosition = 'GK' | 'DF' | 'MF' | 'FW' | 'HC'

type ReportPositionId = 1 | 2 | 3 | 4 | 5

type ReportSelectTeam = 'Home team only' | 'Away team only' | 'Both teams'

interface ReportItem {
  id: number
  homeAway: ReportHomeAway
  playerName: string
  positionId: ReportPositionId
  position: ReportPosition
  shirtNumber: number
  point: string
  text: string
}

interface Report {
  id: number
  title: string
  userId: number
  guestName: string
  matchId: number
  competitionId: number
  competitionName: string
  seasonId: number
  season: string
  utcDate: string
  selectTeam: ReportSelectTeam
  homeTeamId: number
  homeTeamName: string
  homeTeamScore: number
  homeTeamPenalty: number
  homeTeamReportItems: ReportItem[]
  awayTeamId: number
  awayTeamName: string
  awayTeamScore: number
  awayTeamPenalty: number
  awayTeamReportItems: ReportItem[]
  summary: string
  mom: string
}

interface ReportListItem {
  id: number
  title: string
  userName: string
  userImageUrl: string
  description: string
  to: string
}

interface DispReportItem {
  id: number
  playerInfo: string
  point: string
  text: string
  momFlg: boolean
}

interface DispReport {
  userId: number
  userName: string
  userImageUrl: string
  title: string
  competitionName: string
  utcDate: string
  homeTeamId: number
  homeTeamName: string
  homeTeamScore: number
  awayTeamId: number
  awayTeamName: string
  awayTeamScore: number
  dispReportItems: DispReportItem[]
  summary: string
}
