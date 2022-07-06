/** check */
type Team = {
  id: string
  name: string
  imageUrl: string
  venue: string
  website: string
  competitions: {
    name: string
    imageUrl: string
  }[]
  squad: {
    keyId: string
    player: {
      id: string
      name: string
    }
    position: Position
    dateOfBirth: string
    nationality: string
    shirtNumber: number | null
  }[]
  lastUpdated: string
}
