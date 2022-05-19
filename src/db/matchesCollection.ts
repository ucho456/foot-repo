import {
  collection,
  doc,
  getDoc,
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

const matchConverter: FirestoreDataConverter<Match> = {
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

const makeOptions = (searchOption: {
  status: string
  competitionId: string
  teamId: string
  jstDate: string
}): QueryConstraint[] => {
  const options = []
  if (searchOption.status) {
    options.push(where('status', '==', searchOption.status))
  }
  if (searchOption.competitionId) {
    options.push(where('competition.id', '==', searchOption.competitionId))
  }
  if (searchOption.teamId !== '') {
    options.push(where('teamIds', 'array-contains', searchOption.teamId))
  }
  if (searchOption.jstDate) {
    options.push(where('jstDate', '==', searchOption.jstDate))
  }
  return options
}

export const getFirstMatches = async (matches: {
  data: Match[]
  lastVisible: QueryDocumentSnapshot<Match> | null
  searchOption: SearchOption
}): Promise<void> => {
  matches.data = []
  const db = getFirestore()
  const mRef = collection(db, 'matches').withConverter(matchConverter)
  const options = makeOptions(matches.searchOption)
  const q = query(mRef, ...options, orderBy('jstDate', 'desc'), limit(10))
  const mSnapshot = await getDocs(q)
  mSnapshot.forEach((doc) => {
    if (doc.exists()) matches.data.push(doc.data())
  })
  matches.lastVisible = mSnapshot.docs[mSnapshot.docs.length - 1]
}

export const getNextMatches = async (matches: {
  data: Match[]
  lastVisible: QueryDocumentSnapshot<Match> | null
  searchOption: SearchOption
}): Promise<void> => {
  const db = getFirestore()
  const mRef = collection(db, 'matches').withConverter(matchConverter)
  const options = makeOptions(matches.searchOption)
  const q = query(
    mRef,
    ...options,
    orderBy('jstDate', 'desc'),
    startAfter(matches.lastVisible),
    limit(10)
  )
  const mSnapshot = await getDocs(q)
  mSnapshot.forEach((doc) => {
    if (doc.exists()) matches.data.push(doc.data())
  })
  matches.lastVisible = mSnapshot.docs[mSnapshot.docs.length - 1]
}

export const getMatch = async (matchId: string): Promise<Match | null> => {
  const db = getFirestore()
  const mRef = doc(db, 'matches', matchId).withConverter(matchConverter)
  const mSnapshot = await getDoc(mRef)
  return mSnapshot.exists() ? mSnapshot.data() : null
}
