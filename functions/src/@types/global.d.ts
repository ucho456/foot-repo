/** check */
type Card = 'red' | 'yellow'

type HomeAway = 'home' | 'away' | 'both'

type MatchStatus = string | 'FINISHED'

type Position = 'GK' | 'DF' | 'MF' | 'FW' | 'HC' | null

type Player = {
  player: {
    id: string
    name: string
  }
  position: Position
  shirtNumber: number | null
}
