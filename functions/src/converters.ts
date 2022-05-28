import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot
} from 'firebase-admin/firestore'

/*
  competitions
*/
export const scorersConverter: FirestoreDataConverter<Scorers> = {
  toFirestore(scorers: Scorers): DocumentData {
    return {
      season: scorers.season,
      table: scorers.table
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Scorers {
    const data = snapshot.data()
    return {
      id: snapshot.id,
      season: data.season,
      table: data.table
    }
  }
}

export const standingsConverter: FirestoreDataConverter<Standings> = {
  toFirestore(standings: Standings): DocumentData {
    return {
      season: standings.season,
      table: standings.table
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Standings {
    const data = snapshot.data()
    return {
      id: snapshot.id,
      season: data.season,
      table: data.table
    }
  }
}

/*
  matches
*/
export const matchConverter: FirestoreDataConverter<Match> = {
  toFirestore(match: Match): DocumentData {
    return {
      season: match.season,
      jstDate: match.jstDate,
      yearMonth: match.yearMonth,
      matchday: match.matchday,
      status: match.status,
      venue: match.venue,
      teamIds: match.teamIds,
      competition: match.competition,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      lastUpdated: match.lastUpdated
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Match {
    const data = snapshot.data()
    return {
      id: snapshot.id,
      season: data.season,
      jstDate: data.jstDate,
      yearMonth: data.yearMonth,
      matchday: data.matchday,
      status: data.status,
      venue: data.venue,
      teamIds: data.teamIds,
      competition: data.competition,
      homeTeam: data.homeTeam,
      awayTeam: data.awayTeam,
      lastUpdated: data.lastUpdated
    }
  }
}

export const matchDetailConverter: FirestoreDataConverter<MatchDetail> = {
  toFirestore(matchDetail: MatchDetail): DocumentData {
    return {
      homeLineup: matchDetail.homeLineup,
      homeBench: matchDetail.homeBench,
      homeCoachName: matchDetail.homeCoachName,
      awayLineup: matchDetail.awayLineup,
      awayBench: matchDetail.awayBench,
      awayCoachName: matchDetail.awayCoachName,
      goals: matchDetail.goals,
      bookings: matchDetail.bookings,
      substitutions: matchDetail.substitutions,
      lastUpdated: matchDetail.lastUpdated
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): MatchDetail {
    const data = snapshot.data()
    return {
      id: snapshot.id,
      homeLineup: data.homeLineup,
      homeBench: data.homeBench,
      homeCoachName: data.homeCoachName,
      awayLineup: data.awayLineup,
      awayBench: data.awayBench,
      awayCoachName: data.awayCoachName,
      goals: data.goals,
      bookings: data.bookings,
      substitutions: data.substitutions,
      lastUpdated: data.lastUpdated
    }
  }
}

export const forReportConverter: FirestoreDataConverter<ForReport> = {
  toFirestore(forReport: ForReport): DocumentData {
    return {
      homeTeamReportItems: forReport.homeTeamReportItems,
      awayTeamReportItems: forReport.awayTeamReportItems,
      lastUpdated: forReport.lastUpdated
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): ForReport {
    const data = snapshot.data()
    return {
      id: snapshot.id,
      homeTeamReportItems: data.homeTeamReportItems,
      awayTeamReportItems: data.awayTeamReportItems,
      lastUpdated: data.lastUpdated
    }
  }
}

/*
  teams
*/
export const teamConverter: FirestoreDataConverter<Team> = {
  toFirestore(team: Team): DocumentData {
    return {
      name: team.name,
      imageUrl: team.imageUrl,
      venue: team.venue,
      website: team.website,
      squad: team.squad,
      lastUpdated: team.lastUpdated
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Team {
    const data = snapshot.data()
    return {
      id: snapshot.id,
      name: data.name,
      imageUrl: data.imageUrl,
      venue: data.venue,
      website: data.website,
      squad: data.squad,
      lastUpdated: data.lastUpdated
    }
  }
}
