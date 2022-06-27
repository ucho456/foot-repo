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
      awayLineup: matchDetail.awayLineup,
      awayBench: matchDetail.awayBench,
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
      awayLineup: data.awayLineup,
      awayBench: data.awayBench,
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
      competitions: team.competitions,
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
      competitions: data.competitions,
      squad: data.squad,
      lastUpdated: data.lastUpdated
    }
  }
}

/*
  reports
*/
export const reportConverter: FirestoreDataConverter<Report> = {
  toFirestore(report: Report): DocumentData {
    return {
      title: report.title,
      user: report.user,
      homeTeam: report.homeTeam,
      awayTeam: report.awayTeam,
      competition: report.competition,
      jstDate: report.jstDate,
      match: report.match,
      matchday: report.matchday,
      selectTeam: report.selectTeam,
      momId: report.momId,
      summary: report.summary,
      teamIds: report.teamIds,
      publish: report.publish,
      likeCount: report.likeCount,
      frozen: report.frozen,
      createdAt: report.createdAt
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Report {
    const data = snapshot.data()
    return {
      id: snapshot.id,
      title: data.title,
      user: data.user,
      homeTeam: data.homeTeam,
      awayTeam: data.awayTeam,
      competition: data.competition,
      jstDate: data.jstDate,
      match: data.match,
      matchday: data.matchday,
      selectTeam: data.selectTeam,
      momId: data.momId,
      summary: data.summary,
      teamIds: data.teamIds,
      publish: data.publish,
      likeCount: data.likeCount,
      frozen: data.frozen,
      createdAt: data.createdAt
    }
  }
}

/* users */
export const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user: User): DocumentData {
    return {
      name: user.name,
      imageUrl: user.imageUrl,
      greet: user.greet,
      competitionId: user.competitionId,
      team: user.team,
      reportCount: user.reportCount,
      followCount: user.followCount,
      followerCount: user.followerCount
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): User {
    const data = snapshot.data()
    return {
      id: snapshot.id,
      name: data.name,
      imageUrl: data.imageUrl,
      greet: data.greet,
      competitionId: data.competitionId,
      team: data.team,
      reportCount: data.reportCount,
      followCount: data.followCount,
      followerCount: data.followerCount
    }
  }
}

export const likeConverter: FirestoreDataConverter<Like> = {
  toFirestore(like: Like): DocumentData {
    return {
      report: like.report,
      createdAt: like.createdAt
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Like {
    const data = snapshot.data()
    return {
      id: snapshot.id,
      report: data.report,
      createdAt: data.createdAt
    }
  }
}

export const followerConverter: FirestoreDataConverter<Follower> = {
  toFirestore(follower: Follower): DocumentData {
    return {
      user: follower.user
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Follower {
    const data = snapshot.data()
    return {
      id: snapshot.id,
      user: data.user
    }
  }
}
