type User = {
  id: string
  name: string
  imageUrl: string | null
  greet: string
  competitionId: string
  team: {
    id: string
    name: string
  }
}
