type FormatType = 'Home team only' | 'Away team only' | 'Both teams'
type HomeAway = 'home' | 'away'
type Position = 'GK' | 'DF' | 'MF' | 'FW' | 'HC'
type PositionId = 1 | 2 | 3 | 4 | 5
interface ReportItem {
  id: number
  homeAway: HomeAway
  playerName: string
  position: Position
  positionId: PositionId
  shirtNumber: number
  point: number
  text: string
}
interface Report {
  matchId: number
  competitionId: number
  competitionName: string
  seasonId: number
  seasonStartDate: string
  seasonEndDate: string
  utcDate: string
  formatType: FormatType
  homeTeamId: number
  homeTeamName: string
  homeTeamScore: number
  homeTeamReportItems: ReportItem[]
  awayTeamId: number
  awayTeamName: string
  awayTeamScore: number
  awayTeamReportItems: ReportItem[]
  summary: string
}
