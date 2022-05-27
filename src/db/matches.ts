import { Ref } from '@nuxtjs/composition-api'
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
import type { DocumentReference, QueryDocumentSnapshot } from 'firebase/firestore'
import { matchConverter } from '@/utils/converters'
import { makeSearchOption } from '@/utils/searchOption'

export const getFirstMatches = async (matches: {
  data: Match[]
  lastVisible: QueryDocumentSnapshot<Match> | null
  searchOption: SearchOption
}): Promise<void> => {
  matches.data = []
  const db = getFirestore()
  const mRef = collection(db, 'matches').withConverter(matchConverter)
  const options = makeSearchOption(matches.searchOption)
  const q = query(mRef, ...options, orderBy('jstDate', 'desc'), limit(10))
  const mSnapshot = await getDocs(q)
  mSnapshot.forEach((doc) => {
    if (doc.exists()) {
      matches.data.push(doc.data())
    }
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
  const options = makeSearchOption(matches.searchOption)
  const q = query(
    mRef,
    ...options,
    orderBy('jstDate', 'desc'),
    startAfter(matches.lastVisible),
    limit(10)
  )
  const mSnapshot = await getDocs(q)
  mSnapshot.forEach((doc) => {
    if (doc.exists()) {
      matches.data.push(doc.data())
    }
  })
  matches.lastVisible = mSnapshot.docs[mSnapshot.docs.length - 1]
}

export const getMatch = async (matchId: string): Promise<Match | null> => {
  const db = getFirestore()
  const mRef = doc(db, 'matches', matchId).withConverter(matchConverter)
  const mSnapshot = await getDoc(mRef)
  return mSnapshot.exists() ? mSnapshot.data() : null
}

export const getMatchByRef = async (
  matchRef: DocumentReference,
  match: Ref<Match | null>
): Promise<void> => {
  const mRef = matchRef.withConverter(matchConverter)
  const mSnapshot = await getDoc(mRef)
  match.value = mSnapshot.exists() ? mSnapshot.data() : null
}

export const getMatchSchedule = async (league: {
  competitionId: string
  standings: Standings | null
  scorers: Scorers | null
  matchSchedule: Match[]
  season: string
  yearMonth: string
}) => {
  const db = getFirestore()
  const mRef = collection(db, 'matches').withConverter(matchConverter)
  // yearMonthも加える
  const q = query(
    mRef,
    where('competition.id', '==', '2021'), // league.competitionId
    orderBy('jstDate', 'desc'),
    limit(20)
  )
  const mSnapshot = await getDocs(q)
  mSnapshot.forEach((doc) => {
    if (doc.exists()) {
      league.matchSchedule.push(doc.data())
    }
  })
}
