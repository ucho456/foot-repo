type CurrentUser = {
  uid: string
  name: string | null
  imageUrl: string | null
  teamId1: string
  teamId2: string
  teamId3: string
  initSetting: boolean
  subscription: boolean
  suspended: boolean
}

type Position = 'GK' | 'DF' | 'MF' | 'FW' | 'HC'

type Player = {
  name: string
  position: Position
  shirtNumber: number | null
}

type SearchOption = {
  status: string
  competitionId: string
  teamIds: string[]
  jstDate: string
}

type Snackbar = {
  color: '' | 'success' | 'failure'
  message: string
  show: boolean
}
