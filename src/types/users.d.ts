interface GuestUser {
  id: 0
  name: string
  imageUrl: ''
}

interface User {
  id: number
  name: string
  imageUrl: string
}

type UserMap = Map<number, User>
