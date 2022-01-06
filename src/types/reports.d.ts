type FormatType = 'Home team only' | 'Away team only' | 'Both teams'
type HomeAway = 'home' | 'away'
type Position = 'GK' | 'DF' | 'MF' | 'FW' | 'HC'
type PositionId = 1 | 2 | 3 | 4 | 5
interface ReportItem {
  homeAway: HomeAway
  name: string
  position: Position
  positionId: PositionId
  shirtNumber: number
  point: number
  text: string
}
interface Report {
  formatType: FormatType
  reportItems: ReportItem[]
}
