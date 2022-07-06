/** check */
type Card = 'red' | 'yellow'

type CompetitionType = 'league' | 'cup' | 'japan'

type LoginUser = {
  uid: string
  name: string
  imageUrl: string | null
  competitionId: string
  team: {
    id: string
    name: string
  }
}

type HomeAway = 'home' | 'away' | 'both'

type InputReport = {
  title: string
  selectTeam: HomeAway
  homeTeamReportItems: ReportItem[]
  awayTeamReportItems: ReportItem[]
  summary: string
  momId: string
  publish: boolean
}

type InputUser = {
  id: string
  name: string
  imageUrl: string | null
  greet: string
  competitionId: string
  team: {
    id: string
    name: string
  }
}

type MatchStatus = 'SCHEDULED' | 'FINISHED'

type Point =
  | ''
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
  player: {
    id: string
    name: string
  }
  position: Position
  shirtNumber: number | null
}

type SearchOption = {
  status: string
  competitionId: string
  teamId: string
  yearMonth: string
}

type SnackbarColor = '' | 'success' | 'failure' | 'alert'

type SnackbarTextColor = '' | 'black' | 'white'

type Snackbar = {
  color: SnackbarColor
  message: string
  show: boolean
  textColor: SnackbarTextColor
}
