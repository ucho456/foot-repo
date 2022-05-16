type ReportItem = {
  id: string
  playerName: string
  position: Position
  shirtNumber: number
  point: Point
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
  selectTeam: HomeAway
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
