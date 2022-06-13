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
    playerName: string
    position: Position
    dateOfBirth: string
    nationality: string
    shirtNumber: number
  }[]
  lastUpdated: string
}
