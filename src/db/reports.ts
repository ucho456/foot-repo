import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore'
import type { QueryDocumentSnapshot } from 'firebase/firestore'
import { reportItemConverter, reportConverter } from '@/utils/converters'
import { makeSearchOption } from '@/utils/searchOption'

export const createReport = async (
  currentUser: CurrentUser | null,
  inputReport: InputReport,
  match: Match
): Promise<void> => {
  const db = getFirestore()
  const batch = writeBatch(db)

  const rColRef = collection(db, 'reports')
  const rId = doc(rColRef).id
  const rRef = doc(db, 'reports', rId).withConverter(reportConverter)
  batch.set(rRef, {
    id: rId,
    title: inputReport.title,
    user: currentUser
      ? {
          ref: doc(db, `users/${currentUser.uid}`),
          name: currentUser.name,
          imageUrl: currentUser.imageUrl
        }
      : {
          ref: doc(db, 'users/guest'),
          name: 'ゲスト',
          imageUrl: null
        },
    homeTeam: {
      id: match.homeTeam.id,
      ref: doc(db, `teams/${match.homeTeam.id}`),
      name: match.homeTeam.name,
      imageUrl: match.homeTeam.imageUrl,
      score: match.homeTeam.score!
    },
    awayTeam: {
      id: match.awayTeam.id,
      ref: doc(db, `teams/${match.awayTeam.id}`),
      name: match.awayTeam.name,
      imageUrl: match.awayTeam.imageUrl,
      score: match.awayTeam.score!
    },
    competition: {
      id: match.competition.id,
      ref: doc(db, `competitions/${match.competition.id}`),
      name: match.competition.name
    },
    jstDate: match.jstDate,
    match: {
      id: match.id,
      ref: doc(db, `matches/${match.id}`)
    },
    selectTeam: inputReport.selectTeam,
    momId: inputReport.momId,
    summary: inputReport.summary,
    teamIds: [match.homeTeam.id, match.awayTeam.id],
    createdAt: serverTimestamp()
  })

  inputReport.homeTeamReportItems.forEach((htri) => {
    const htriColRef = collection(db, 'home-team-report-items')
    const htriId = doc(htriColRef).id
    const htriRef = doc(db, 'reports', rId, 'home-team-report-items', htriId).withConverter(
      reportItemConverter
    )
    batch.set(htriRef, htri)
  })

  inputReport.awayTeamReportItems.forEach((atri) => {
    const atriColRef = collection(db, 'away-team-report-items')
    const atriId = doc(atriColRef).id
    const atriRef = doc(db, 'reports', rId, 'away-team-report-items', atriId).withConverter(
      reportItemConverter
    )
    batch.set(atriRef, atri)
  })
  await batch.commit()
}

export const getFirstReports = async (reports: {
  data: Report[]
  lastVisible: QueryDocumentSnapshot<Report> | null
  searchOption: SearchOption
}) => {
  const db = getFirestore()
  reports.data = []
  const rRef = collection(db, 'reports').withConverter(reportConverter)
  const options = makeSearchOption(reports.searchOption)
  const q = query(rRef, ...options, orderBy('createdAt', 'desc'), limit(10))
  const rSnapshot = await getDocs(q)
  rSnapshot.forEach((doc) => {
    if (doc.exists()) {
      reports.data.push(doc.data())
    }
  })
  reports.lastVisible = rSnapshot.docs[rSnapshot.docs.length - 1]
}

export const getReportAndItems = async (
  reportId: string
): Promise<{
  resReport: Report
  resHomeTeamReportItems: ReportItem[]
  resAwayTeamReportItems: ReportItem[]
}> => {
  const db = getFirestore()
  const rRef = doc(db, 'reports', reportId).withConverter(reportConverter)
  const rShapshot = await getDoc(rRef)

  if (rShapshot.exists()) {
    const resReport = rShapshot.data()
    const resHomeTeamReportItems: ReportItem[] = []
    const resAwayTeamReportItems: ReportItem[] = []
    const htriRef = collection(db, 'reports', reportId, 'home-team-report-items').withConverter(
      reportItemConverter
    )
    const htriQ = query(htriRef, orderBy('order', 'asc'))
    const atriRef = collection(db, 'reports', reportId, 'away-team-report-items').withConverter(
      reportItemConverter
    )
    const atriQ = query(atriRef, orderBy('order', 'asc'))
    if (resReport.selectTeam === 'home') {
      const htriSnapshot = await getDocs(htriQ)
      htriSnapshot.forEach((doc) => {
        if (doc.exists()) {
          resHomeTeamReportItems.push(doc.data())
        }
      })
    } else if (resReport.selectTeam === 'away') {
      const atriSnapshot = await getDocs(atriQ)
      atriSnapshot.forEach((doc) => {
        if (doc.exists()) {
          resAwayTeamReportItems.push(doc.data())
        }
      })
    } else {
      const htriSnapshot = await getDocs(htriQ)
      htriSnapshot.forEach((doc) => {
        if (doc.exists()) {
          resHomeTeamReportItems.push(doc.data())
        }
      })
      const atriSnapshot = await getDocs(atriQ)
      atriSnapshot.forEach((doc) => {
        if (doc.exists()) {
          resAwayTeamReportItems.push(doc.data())
        }
      })
    }
    return { resReport, resHomeTeamReportItems, resAwayTeamReportItems }
  } else {
    throw new Error('Not Found')
  }
}
