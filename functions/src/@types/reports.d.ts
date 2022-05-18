type ReportItem = {
  id: string
  playerName: string
  position: 'GK' | 'DF' | 'MF' | 'FW' | 'HC'
  shirtNumber: number | null
  point: '6.5'
  text: string
}