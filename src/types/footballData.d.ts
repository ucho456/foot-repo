type DefaultPosition = 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Attacker' | 'HeadCoach'
interface Player {
  id: number
  name: string
  position: DefaultPosition
  shirtNumber: number
}
interface Substitution {
  minute: number
  team: {
    id: number
    name: string
  }
  playerOut: {
    id: number
    name: string
  }
  playerIn: {
    id: number
    name: string
  }
}
interface Match {
  id: number
  competition: {
    id: number
    name: string
  }
  season: {
    id: number
    startDate: string
    endDate: string
    currentMatchday: number
    availableStages: string[]
  }
  utcDate: string
  status: string
  minute: null
  attendance: number
  venue: string
  matchday: number
  stage: string
  group: string
  lastUpdated: string
  homeTeam: {
    id: number
    name: string
    coach: {
      id: number
      name: string
      countryOfBirth: string
      nationality: string
    }
    captain: {
      id: number
      name: string
      shirtNumber: number
    }
    lineup: Player[]
    bench: Player[]
  }
  awayTeam: {
    id: number
    name: string
    coach: {
      id: number
      name: string
      countryOfBirth: string
      nationality: string
    }
    captain: {
      id: number
      name: string
      shirtNumber: number
    }
    lineup: Player[]
    bench: Player[]
  }
  score: {
    winner: string
    duration: string
    fullTime: {
      homeTeam: number
      awayTeam: number
    }
    halfTime: {
      homeTeam: number
      awayTeam: number
    }
    extraTime: {
      homeTeam: number | null
      awayTeam: number | null
    }
    penalties: {
      homeTeam: number | null
      awayTeam: number | null
    }
  }
  goals: {
    minute: number
    extraTime: number | null
    type: string
    team: {
      id: number
      name: string
    }
    scorer: {
      id: number
      name: string
    }
    assist: {
      id: number
      name: string
    } | null
  }[]
  bookings: {
    minute: number
    team: {
      id: number
      name: string
    }
    player: {
      id: number
      name: string
    }
    card: string
  }[]
  substitutions: Substitution[]
  referees: {
    id: number
    name: string
    nationality: string | null
  }[]
}
interface ResponseMatch {
  head2head: {
    numberOfMatches: number
    totalGoals: number
    homeTeam: {
      wins: number
      draws: number
      losses: number
    }
    awayTeam: {
      wins: number
      draws: number
      losses: number
    }
  }
  match: Match
}
