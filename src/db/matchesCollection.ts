import { Ref } from '@nuxtjs/composition-api'
import { collection, getDocs, getFirestore, limit, orderBy, query } from 'firebase/firestore'
import type {
  DocumentData,
  FirestoreDataConverter,
  SnapshotOptions,
  QueryDocumentSnapshot
} from 'firebase/firestore'
import { Match } from '@/types/matches'

const matchProperties = (match: Match) => {
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
}

const userConverter: FirestoreDataConverter<Match> = {
  toFirestore(match: Match): DocumentData {
    return matchProperties(match)
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
      homeTeam: data.homeTeam,
      awayTeam: data.awayTeam,
      lastUpdated: data.lastUpdated
    }
  }
}

export const getMatches = async (matches: Ref<Match[]>): Promise<Ref<Match[]>> => {
  const db = getFirestore()
  const mRef = collection(db, 'matches').withConverter(userConverter)
  const q = query(mRef, orderBy('jstDate', 'desc'), limit(20))
  const mSnapshot = await getDocs(q)
  mSnapshot.forEach((doc) => {
    if (doc.exists()) matches.value.push(doc.data())
  })
  return matches
}
