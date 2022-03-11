type ProviderType = 'email' | 'twitter' | 'google'

type InitCurrentUser = {
  uid: string
  name: string | null
  photoUrl: string | null
}
