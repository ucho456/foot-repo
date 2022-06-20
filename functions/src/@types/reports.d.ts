type ReportItem = {
  id: string
  player: {
    id: string
    name: string
  }
  position: Position
  shirtNumber: number | null
  point: ''
  text: string
  order: number
}
