import { Ref } from '@nuxtjs/composition-api'
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
  if (searchOption.status) options.push(where('status', '==', searchOption.status))
  if (searchOption.competitionId)
    options.push(where('competition.id', '==', searchOption.competitionId))
  if (searchOption.teamId)
    options.push(where('teamIds', 'array-contains-any', [searchOption.teamId]))
  if (searchOption.jstDate) options.push(where('jstDate', '==', searchOption.jstDate))
  return options
}

export const getFirstMatches = async (
  matches: Ref<Match[]>,
  lastVisible: Ref<QueryDocumentSnapshot<Match> | null>,
  searchOption: { status: string; competitionId: string; teamId: string; jstDate: string }
): Promise<{
  matches: Ref<Match[]>
  lastVisible: Ref<QueryDocumentSnapshot<Match> | null>
}> => {
  const db = getFirestore()
  const mRef = collection(db, 'matches').withConverter(userConverter)
  const options = makeOptions(searchOption)
  const q = query(mRef, ...options, orderBy('jstDate', 'desc'), limit(10))
  const mSnapshot = await getDocs(q)
  mSnapshot.forEach((doc) => {
    if (doc.exists()) matches.value.push(doc.data())
  })
  lastVisible.value = mSnapshot.docs[mSnapshot.docs.length - 1]
  return { matches, lastVisible }
}

export const getNextMatches = async (
  matches: Ref<Match[]>,
  lastVisible: Ref<QueryDocumentSnapshot<Match> | null>,
  searchOption: { status: string; competitionId: string; teamId: string; jstDate: string }
): Promise<{
  matches: Ref<Match[]>
  lastVisible: Ref<QueryDocumentSnapshot<Match> | null>
}> => {
  const db = getFirestore()
  const mRef = collection(db, 'matches').withConverter(userConverter)
  const options = makeOptions(searchOption)
  const q = query(
    mRef,
    ...options,
    orderBy('jstDate', 'desc'),
    startAfter(lastVisible.value),
    limit(10)
  )
  const mSnapshot = await getDocs(q)
  mSnapshot.forEach((doc) => {
    if (doc.exists()) matches.value.push(doc.data())
  })
  lastVisible.value = mSnapshot.docs[mSnapshot.docs.length - 1]
  return { matches, lastVisible }
}
