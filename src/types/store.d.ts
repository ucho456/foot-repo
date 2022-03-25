type CurrentUser = {
  uid: string
  name: string | null
  photoUrl: string | null
}

type Snackbar = {
  color: '' | 'success' | 'failure'
  message: string
  show: boolean
}
