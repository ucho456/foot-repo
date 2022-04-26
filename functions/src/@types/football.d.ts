type FbMatch = {
  id: number
  season: {
    startDate: string
  }
  utcDate: string
  status: 'SCHEDULED' | 'FINISHED'
  matchday: number
  score: {
    fullTime: {
      homeTeam: null | number
      awayTeam: null | number
    }
    penalties: {
      homeTeam: null | number
      awayTeam: null | number
    }
  }
  homeTeam: {
    id: number
    name: string
    coach: {
      id: number
      name: string
    }
    lineup: {
      id: number
      name: string
      position: 'Goalkeeper' | 'Defence' | 'Midfield' | 'Offence'
      shirtNumber: number
    }[]
    bench: {
      id: number
      name: string
      position: 'Goalkeeper' | 'Defence' | 'Midfield' | 'Offence'
      shirtNumber: number
    }[]
  }
  awayTeam: {
    id: number
    name: string
    coach: {
      id: number
      name: string
    }
    lineup: {
      id: number
      name: string
      position: 'Goalkeeper' | 'Defence' | 'Midfield' | 'Offence'
      shirtNumber: number
    }[]
    bench: {
      id: number
      name: string
      position: 'Goalkeeper' | 'Defence' | 'Midfield' | 'Offence'
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
    minutes: number
    team: {
      id: number
      name: string
    }
    playerOut: {
      name: string
    }
    playerIn: {
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
    position: 'Goalkeeper' | 'Defence' | 'Midfield' | 'Offence'
    dateOfBirth: string
    nationality: string
  }[]
  lastUpdated: string
}
