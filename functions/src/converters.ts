import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot
} from 'firebase-admin/firestore'
import { Standings } from './@types/standings'
import { Match } from './@types/matches'

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
  fromFirestore(snapshot: QueryDocumentSnapshot): Match {
    const data = snapshot.data()
    return {
      id: data.id,
      season: data.season,
      jstDate: data.jstDate,
      matchday: data.matchday,
      status: data.status,
      teamIds: data.teamIds,
      homeTeam: data.homeTeam,
      awayTeam: data.awayTeam,
      lastUpdated: data.lastUpdated
    }
  }
}

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
      id: data.id,
      name: data.name,
      imageUrl: data.imageUrl,
      venue: data.venue,
      website: data.website,
      squad: data.squad,
      lastUpdated: data.lastUpdated
    }
  }
}
