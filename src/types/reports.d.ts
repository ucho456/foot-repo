type ReportHomeAway = 'home' | 'away'

type ReportPoint =
  | '0.0'
  | '0.5'
  | '1.0'
  | '1.5'
  | '2.0'
  | '2.5'
  | '3.0'
  | '3.5'
  | '4.0'
  | '4.5'
  | '5.0'
  | '5.5'
  | '6.0'
  | '6.5'
  | '7.0'
  | '7.5'
  | '8.0'
  | '8.5'
  | '9.0'
  | '9.5'
  | '10.0'

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
  point: ReportPoint
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
  momId: number
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
