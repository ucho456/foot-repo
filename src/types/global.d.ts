type Card = 'red' | 'yellow'

type CompetitionType = 'league' | 'cup' | 'japan'

type CurrentUser = {
  uid: string
  name: string | null
  imageUrl: string | null
  competitionId: string
  teamId: string
  initSetting: boolean
  subscription: boolean
  suspended: boolean
}

type HomeAway = 'home' | 'away' | 'both'

type InputReport = {
  title: string
  selectTeam: HomeAway
  homeTeamReportItems: ReportItem[]
  awayTeamReportItems: ReportItem[]
  summary: string
  momId: string
}

type MatchStatus = 'SCHEDULED' | 'FINISHED'

type Point =
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

type Position = 'GK' | 'DF' | 'MF' | 'FW' | 'HC'

type Player = {
  id: string
  name: string
  position: Position
  shirtNumber: number | null
}

type SearchOption = {
  status: string
  competitionId: string
  teamId: string
  jstDate: string
}

type Snackbar = {
  color: '' | 'success' | 'failure'
  message: string
  show: boolean
}
