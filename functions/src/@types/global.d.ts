/** check */
type Card = 'red' | 'yellow'

type HomeAway = 'home' | 'away' | 'both'

type MatchStatus = 'SCHEDULED' | 'FINISHED'

type Position = 'GK' | 'DF' | 'MF' | 'FW' | 'HC' | null

type Player = {
  player: {
    id: string
    name: string
  }
  position: Position
  shirtNumber: number | null
}
