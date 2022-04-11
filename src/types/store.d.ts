type CurrentUser = {
  uid: string
  name: string | null
  imageUrl: string | null
  teamId1: number
  teamId2: number
  teamId3: number
  initSetting: boolean
  subscription: boolean
  suspended: boolean
}

type Snackbar = {
  color: '' | 'success' | 'failure'
  message: string
  show: boolean
}
