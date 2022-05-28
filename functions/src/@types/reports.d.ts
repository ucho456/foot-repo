type ReportItem = {
  id: string
  player: {
    id: string
    name: string
  }
  position: Position
  shirtNumber: number | null
  point: '6.5'
  text: string
  order: number
}
