type ProviderType = 'email' | 'twitter' | 'google'

type initCurrentUser = {
  uid: string
  name: string | null
  photoUrl: string | null
}
