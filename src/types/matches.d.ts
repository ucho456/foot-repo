type MatchCard = 'YELLOW_CARD' | 'RED_CARD' | ''

type MatchPosition = 'GK' | 'DF' | 'MF' | 'FW' | 'HC'

type MatchPositionId = 1 | 2 | 3 | 4 | 5

type MatchStatus = 'FINISHED' | 'SCHEDULED'

interface MatchPlayer {
  id: number
  name: string
  positionId: MatchPositionId
  position: MatchPosition
  shirtNumber: number
  goal: number
  assist: number
  card: MatchCard
  out: number
  in: number
}

interface MatchTeam {
  id: number
  name: string
  lineup: MatchPlayer[]
  bench: MatchPlayer[]
  coach: MatchPlayer
}

interface Match {
  id: number
  competitionId: number
  competitionName: string
  seasonId: number
  season: string
  section: number
  utcDate: string
  status: MatchStatus
  venue: string
  homeTeam: MatchTeam
  homeTeamScore: number
  homeTeamPenalty: number
  awayTeam: MatchTeam
  awayTeamScore: number
  awayTeamPenalty: number
}

interface MatchListItem {
  id: number
  homeTeamName: string
  homeTeamImageUrl: string
  awayTeamName: string
  awayTeamImageUrl: string
  score: string
  description: string
  to: {
    path: string
    query: {
      matchId: number
    }
  }
}
