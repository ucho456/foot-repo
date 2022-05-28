type FbPosition = 'Goalkeeper' | 'Defence' | 'Midfield' | 'Offence' | null

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
      name: string
    }
    assist: null | {
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
  competition: {
    id: number
  }
  season: {
    startDate: string
  }
  scorers: {
    player: {
      name: string
    }
    team: {
      name: string
    }
    numberOfGoals: number
  }[]
}

type FbStandings = {
  competition: {
    id: number
  }
  season: {
    startDate: string
  }
  standings: {
    table: {
      position: number
      team: {
        id: number
        name: string
        crestUrl: string
      }
      playedGames: number
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
  crestUrl: string
  website: string
  venue: string
  squad: {
    name: string
    position: FbPosition
    dateOfBirth: string
    nationality: string
  }[]
  lastUpdated: string
}
