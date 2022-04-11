type CurrentUser = {
  uid: string
  name: string | null
  imageUrl: string | null
  subscription: boolean
}

type Snackbar = {
  color: '' | 'success' | 'failure'
  message: string
  show: boolean
}
