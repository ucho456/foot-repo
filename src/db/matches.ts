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
import type { QueryDocumentSnapshot } from 'firebase/firestore'
import { forReportConverter, matchConverter } from '@/utils/converters'
import { makeSearchOption } from '@/utils/searchOption'

export const setFirstMatches = async (matches: {
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

export const setNextMatches = async (matches: {
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

export const fetchMatch = async (matchId: string): Promise<Match | null> => {
  const db = getFirestore()
  const mRef = doc(db, 'matches', matchId).withConverter(matchConverter)
  const mSnapshot = await getDoc(mRef)
  return mSnapshot.exists() ? mSnapshot.data() : null
}

export const getForReport = async (matchId: string): Promise<ForReport | null> => {
  const db = getFirestore()
  const frRef = doc(db, 'matches', matchId, 'for-report', matchId).withConverter(forReportConverter)
  const frSnapshot = await getDoc(frRef)
  return frSnapshot.exists() ? frSnapshot.data() : null
}

export const setMatchSchedule = async (league: {
  competitionId: string
  standings: Standings | null
  scorers: Scorers | null
  matchSchedule: Match[]
  season: string
  yearMonth: string
}) => {
  league.matchSchedule = []
  const db = getFirestore()
  const mRef = collection(db, 'matches').withConverter(matchConverter)
  const q = query(
    mRef,
    where('competition.id', '==', league.competitionId),
    where('yearMonth', '==', league.yearMonth),
    orderBy('jstDate', 'desc')
  )
  const mSnapshot = await getDocs(q)
  mSnapshot.forEach((doc) => {
    if (doc.exists()) {
      league.matchSchedule.push(doc.data())
    }
  })
}
