/** check */
type FbPosition =
  | 'Goalkeeper'
  | 'Defence'
  | 'Right-Back'
  | 'Centre-Back'
  | 'Left-Back'
  | 'Midfield'
  | 'Defensive Midfield'
  | 'Central Midfield'
  | 'Attacking Midfield'
  | 'Left Midfield'
  | 'Right Midfield'
  | 'Left Winger'
  | 'Right Winger'
  | 'Centre-Forward'
  | 'Offence'
  | 'Attacker'
  | null

type FbMatch = {
  id: number
  competition: {
    emblem: string
  }
  season: {
    startDate: string
  }
  utcDate: string
  status: 'SCHEDULED' | 'FINISHED'
  matchday: number
  venue: string
  score: {
    fullTime: {
      home: null | number
      away: null | number
    }
    penalties?: {
      home: null | number
      away: null | number
    }
  }
  homeTeam: {
    id: number
    name: string
    tla: string
    crest: string
    coach: {
      id: number
      name: string
    }
    lineup: {
      id: number
      name: string
      position: FbPosition
      shirtNumber: number
    }[]
    bench: {
      id: number
      name: string
      position: FbPosition
      shirtNumber: number
    }[]
  }
  awayTeam: {
    id: number
    name: string
    tla: string
    crest: string
    coach: {
      id: number
      name: string
    }
    lineup: {
      id: number
      name: string
      position: FbPosition
      shirtNumber: number
    }[]
    bench: {
      id: number
      name: string
      position: FbPosition
      shirtNumber: number
    }[]
  }
  goals: {
    minute: number
    team: {
      id: number
      name: string
    }
    scorer: {
      id: number
      name: string
    }
    assist: null | {
      id: number
      name: string
    }
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
    card: 'YELLOW_CARD' | 'RED_CARD'
  }[]
  substitutions: {
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
  }[]
  lastUpdated: string
}

type FbScorers = {
  season: {
    startDate: string
  }
  scorers: {
    player: {
      id: number
      name: string
    }
    team: {
      id: number
      name: string
      crest: string
    }
    goals: number | null
    assists: number | null
    penalties: number | null
  }[]
}

type FbStandings = {
  season: {
    startDate: string
  }
  standings: {
    table: {
      position: number
      team: {
        id: number
        name: string
        crest: string
      }
      playedGames: number
      form: string
      won: number
      draw: number
      lost: number
      points: number
      goalsFor: number
      goalsAgainst: number
      goalDifference: number
    }[]
  }[]
}

type FbTeam = {
  id: number
  name: string
  crest: string
  venue: string
  website: string
  runningCompetitions: {
    name: string
    emblem: string
  }[]
  squad: {
    id: number
    name: string
    position: FbPosition
    dateOfBirth: string
    nationality: string
    shirtNumber: number
  }[]
  lastUpdated: string
}
