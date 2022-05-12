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

type Snackbar = {
  color: '' | 'success' | 'failure'
  message: string
  show: boolean
}
