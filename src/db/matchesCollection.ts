import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
  where
} from 'firebase/firestore'
import type {
  DocumentData,
  FirestoreDataConverter,
  SnapshotOptions,
  QueryConstraint,
  QueryDocumentSnapshot
} from 'firebase/firestore'

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
      competition: data.competition,
      homeTeam: data.homeTeam,
      awayTeam: data.awayTeam,
      lastUpdated: data.lastUpdated
    }
  }
}

const makeOptions = (searchOption: {
  status: string
  competitionId: string
  teamIds: string[]
  jstDate: string
}): QueryConstraint[] => {
  const options = []
  if (searchOption.status) options.push(where('status', '==', searchOption.status))
  if (searchOption.competitionId) {
    options.push(where('competition.id', '==', searchOption.competitionId))
  }
  if (searchOption.teamIds.length > 0) {
    options.push(where('teamIds', 'array-contains-any', searchOption.teamIds))
  }
  if (searchOption.jstDate) options.push(where('jstDate', '==', searchOption.jstDate))
  return options
}

export const getFirstMatches = async (match: {
  data: Match[]
  lastVisible: QueryDocumentSnapshot<Match> | null
  searchOption: SearchOption
}): Promise<void> => {
  const db = getFirestore()
  const mRef = collection(db, 'matches').withConverter(userConverter)
  const options = makeOptions(match.searchOption)
  const q = query(mRef, ...options, orderBy('jstDate', 'desc'), limit(10))
  const mSnapshot = await getDocs(q)
  mSnapshot.forEach((doc) => {
    if (doc.exists()) match.data.push(doc.data())
  })
  match.lastVisible = mSnapshot.docs[mSnapshot.docs.length - 1]
}

export const getNextMatches = async (match: {
  data: Match[]
  lastVisible: QueryDocumentSnapshot<Match> | null
  searchOption: SearchOption
}): Promise<void> => {
  const db = getFirestore()
  const mRef = collection(db, 'matches').withConverter(userConverter)
  const options = makeOptions(match.searchOption)
  const q = query(
    mRef,
    ...options,
    orderBy('jstDate', 'desc'),
    startAfter(match.lastVisible),
    limit(10)
  )
  const mSnapshot = await getDocs(q)
  mSnapshot.forEach((doc) => {
    if (doc.exists()) match.data.push(doc.data())
  })
  match.lastVisible = mSnapshot.docs[mSnapshot.docs.length - 1]
}
