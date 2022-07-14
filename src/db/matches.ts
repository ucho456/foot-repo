/** check */
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getDocsFromServer,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
  where
} from 'firebase/firestore'
import type { QueryDocumentSnapshot } from 'firebase/firestore'
import { forReportConverter, matchConverter, matchDetailConverter } from '@/utils/converters'
import { makeSearchOption } from '@/utils/searchOption'
const perPage = 10

/** Matches Read */
export const fetchMatch = async (matchId: string): Promise<Match | null> => {
  const db = getFirestore()
  const mRef = doc(db, 'matches', matchId).withConverter(matchConverter)
  const mSnapshot = await getDoc(mRef)
  return mSnapshot.exists() ? mSnapshot.data() : null
}

export const toStoreMatch = async (
  matchId: string,
  match: { data: Match | null; detail: MatchDetail | null }
) => {
  const db = getFirestore()
  const mRef = doc(db, 'matches', matchId).withConverter(matchConverter)
  const mSnapshot = await getDoc(mRef)
  match.data = mSnapshot.exists() ? mSnapshot.data() : null
  if (mSnapshot.exists()) {
    const mdRef = doc(db, 'matches', matchId, 'match-detail', matchId).withConverter(
      matchDetailConverter
    )
    const mdSnapshot = await getDoc(mdRef)
    match.detail = mdSnapshot.exists() ? mdSnapshot.data() : null
  }
}

export const toStoreMatches = async (matches: {
  data: Match[]
  lastVisible: QueryDocumentSnapshot<Match> | null
  searchOption: SearchOption
  hasNext: boolean
}): Promise<void> => {
  const db = getFirestore()
  const mRef = collection(db, 'matches').withConverter(matchConverter)
  const options = makeSearchOption(matches.searchOption)
  const q = matches.lastVisible
    ? query(
        mRef,
        ...options,
        orderBy('jstDate', 'desc'),
        startAfter(matches.lastVisible),
        limit(perPage)
      )
    : query(mRef, ...options, orderBy('jstDate', 'desc'), limit(perPage))
  const mSnapshot = await getDocs(q)
  mSnapshot.forEach((doc) => {
    if (doc.exists()) matches.data.push(doc.data())
  })
  matches.lastVisible = mSnapshot.docs[mSnapshot.size - 1]
  if (mSnapshot.size < perPage) matches.hasNext = false
}

export const toStoreMatchSchedule = async (league: {
  competitionId: string
  matchSchedule: Match[]
  yearMonth: string
  lastVisible: QueryDocumentSnapshot<Match> | null
  hasNext: boolean
}) => {
  const db = getFirestore()
  const mRef = collection(db, 'matches').withConverter(matchConverter)
  const q = league.lastVisible
    ? query(
        mRef,
        where('competition.id', '==', league.competitionId),
        where('yearMonth', '==', league.yearMonth),
        orderBy('jstDate', 'desc'),
        startAfter(league.lastVisible),
        limit(perPage)
      )
    : query(
        mRef,
        where('competition.id', '==', league.competitionId),
        where('yearMonth', '==', league.yearMonth),
        orderBy('jstDate', 'desc'),
        limit(perPage)
      )
  const mSnapshot = await getDocs(q)
  mSnapshot.forEach((doc) => {
    if (doc.exists()) league.matchSchedule.push(doc.data())
  })
  league.lastVisible = mSnapshot.docs[mSnapshot.size - 1]
  if (mSnapshot.size < perPage) league.hasNext = false
}

export const fetchUpdateCandidateMatches = async (): Promise<Match[]> => {
  const db = getFirestore()
  const mRef = collection(db, 'matches').withConverter(matchConverter)
  // const today = new Date()
  // const jstDate = `${today.getFullYear()}-${today.getMonth() - 1}-${today.getDate()}`
  const promptUpdateTime = Timestamp.fromDate(new Date())
  const q = query(
    mRef,
    where('status', '==', 'SCHEDULED'),
    where('jstDate', '==', '2022-05-24'),
    where('promptUpdateTime', '<=', promptUpdateTime)
  )
  const mSnapshot = await getDocsFromServer(q)
  const matches: Match[] = []
  mSnapshot.forEach((doc) => {
    if (doc.exists()) matches.push(doc.data())
  })
  return matches
}

/** ForReport Read */
export const fetchForReport = async (matchId: string): Promise<ForReport | null> => {
  const db = getFirestore()
  const frRef = doc(db, 'matches', matchId, 'for-report', matchId).withConverter(forReportConverter)
  const frSnapshot = await getDoc(frRef)
  return frSnapshot.exists() ? frSnapshot.data() : null
}
