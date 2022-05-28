type Team = {
  id: string
  name: string
  imageUrl: string
  venue: string
  website: string
  squad: {
    playerName: string
    position: Position
    dateOfBirth: string
    nationality: string
  }[]
  lastUpdated: string
}
