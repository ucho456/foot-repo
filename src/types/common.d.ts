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

type Position = 'GK' | 'DF' | 'MF' | 'FW' | 'HC'

type Player = {
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
