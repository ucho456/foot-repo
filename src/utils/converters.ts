import type {
  DocumentData,
  FirestoreDataConverter,
  SnapshotOptions,
  QueryDocumentSnapshot
} from 'firebase/firestore'

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
      matchday: match.matchday,
      status: match.status,
      teamIds: match.teamIds,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      lastUpdated: match.lastUpdated
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Match {
    const data = snapshot.data(options)
    return {
      id: snapshot.id,
      season: data.season,
      jstDate: data.jstDate,
      matchday: data.matchday,
      status: data.status,
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
      selectTeam: report.selectTeam,
      momId: report.momId,
      summary: report.summary,
      teamIds: report.teamIds,
      createdAt: report.createdAt
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Report {
    const data = snapshot.data(options)
    return {
      id: snapshot.id,
      title: data.title,
      user: data.user,
      homeTeam: data.homeTeam,
      awayTeam: data.awayTeam,
      competition: data.competition,
      jstDate: data.jstDate,
      match: data.match,
      selectTeam: data.selectTeam,
      momId: data.momId,
      summary: data.summary,
      teamIds: data.teamIds,
      createdAt: data.createdAt
    }
  }
}

export const reportItemConverter: FirestoreDataConverter<ReportItem> = {
  toFirestore(reportItem: ReportItem): DocumentData {
    return {
      playerName: reportItem.playerName,
      position: reportItem.position,
      shirtNumber: reportItem.shirtNumber,
      point: reportItem.point,
      text: reportItem.text,
      order: reportItem.order
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ReportItem {
    const data = snapshot.data(options)
    return {
      id: snapshot.id,
      playerName: data.playerName,
      position: data.position,
      shirtNumber: data.shirtNumber,
      point: data.point,
      text: data.text,
      order: data.order
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

/*
  users
*/
export const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user: User): DocumentData {
    return {
      name: user.name,
      imageUrl: user.imageUrl,
      greet: user.greet,
      competitionId: user.competitionId,
      teamId: user.teamId
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): User {
    const data = snapshot.data(options)
    return {
      id: snapshot.id,
      name: data.name,
      imageUrl: data.imageUrl,
      greet: data.greet,
      competitionId: data.competitionId,
      teamId: data.teamId
    }
  }
}
