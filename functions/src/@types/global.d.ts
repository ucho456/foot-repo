/** check */
type Card = 'red' | 'yellow'

type HomeAway = 'home' | 'away' | 'both'

type MatchStatus = 'SCHEDULED' | 'FINISHED'

type MatchStage =
  | 'REGULAR_SEASON'
  | 'GROUP_STAGE'
  | 'LAST_16'
  | 'QUARTER_FINALS'
  | 'SEMI_FINALS'
  | 'THIRD_PLACE'
  | 'FINAL'

type Position = 'GK' | 'DF' | 'MF' | 'FW' | 'HC' | null

type Player = {
  player: {
    id: string
    name: string
  }
  position: Position
  shirtNumber: number | null
}
