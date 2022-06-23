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
import type { QueryDocumentSnapshot } from 'firebase/firestore'
import { forReportConverter, matchConverter, matchDetailConverter } from '@/utils/converters'
import { makeSearchOption } from '@/utils/searchOption'

const perPage = 10
export const toStoreFirstMatches = async (matches: {
  data: Match[]
  lastVisible: QueryDocumentSnapshot<Match> | null
  searchOption: SearchOption
}): Promise<void> => {
  matches.data = []
  const db = getFirestore()
  const mRef = collection(db, 'matches').withConverter(matchConverter)
  const options = makeSearchOption(matches.searchOption)
  const q = query(mRef, ...options, orderBy('jstDate', 'desc'), limit(perPage))
  const mSnapshot = await getDocs(q)
  mSnapshot.forEach((doc) => {
    if (doc.exists()) {
      matches.data.push(doc.data())
    }
  })
  matches.lastVisible = mSnapshot.docs[mSnapshot.docs.length - 1]
}

export const toStoreNextMatches = async (
  matches: {
    data: Match[]
    lastVisible: QueryDocumentSnapshot<Match> | null
    searchOption: SearchOption
  },
  hasNextPage: Ref<boolean>
): Promise<void> => {
  const db = getFirestore()
  const mRef = collection(db, 'matches').withConverter(matchConverter)
  const options = makeSearchOption(matches.searchOption)
  const q = query(
    mRef,
    ...options,
    orderBy('jstDate', 'desc'),
    startAfter(matches.lastVisible),
    limit(perPage)
  )
  const mSnapshot = await getDocs(q)
  mSnapshot.forEach((doc) => {
    if (doc.exists()) {
      matches.data.push(doc.data())
    }
  })
  if (mSnapshot.size === 0) {
    hasNextPage.value = false
  }
  matches.lastVisible = mSnapshot.docs[mSnapshot.docs.length - 1]
}

export const fetchMatch = async (matchId: string): Promise<Match | null> => {
  const db = getFirestore()
  const mRef = doc(db, 'matches', matchId).withConverter(matchConverter)
  const mSnapshot = await getDoc(mRef)
  return mSnapshot.exists() ? mSnapshot.data() : null
}

export const fetchForReport = async (matchId: string): Promise<ForReport | null> => {
  const db = getFirestore()
  const frRef = doc(db, 'matches', matchId, 'for-report', matchId).withConverter(forReportConverter)
  const frSnapshot = await getDoc(frRef)
  return frSnapshot.exists() ? frSnapshot.data() : null
}

export const toStoreMatchSchedule = async (league: {
  competitionId: string
  matchSchedule: Match[]
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
