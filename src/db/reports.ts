/** check */
import {
  collection,
  doc,
  documentId,
  endBefore,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAfter,
  startAt,
  where,
  writeBatch
} from 'firebase/firestore'
import type { QueryDocumentSnapshot, Unsubscribe } from 'firebase/firestore'
import {
  commentConverter,
  likeConverter,
  reportConverter,
  reportItemConverter,
  userConverter
} from '@/utils/converters'
import { makeSearchOption } from '@/utils/searchOption'
const perPage = 10

/** Reports Create */
export const postReport = async (
  loginUser: LoginUser | null,
  newReport: InputReport,
  match: Match
): Promise<string> => {
  const db = getFirestore()
  const batch = writeBatch(db)
  const rColRef = collection(db, 'reports')
  const rId = doc(rColRef).id
  const rRef = doc(db, 'reports', rId).withConverter(reportConverter)
  const user = loginUser
    ? {
        id: loginUser.uid,
        ref: doc(db, 'users', loginUser.uid),
        name: loginUser.name,
        imageUrl: loginUser.imageUrl
      }
    : { id: 'guest', ref: doc(db, 'users', 'guest'), name: 'Guest', imageUrl: null }
  batch.set(rRef, {
    id: rId,
    title:
      newReport.title !== ''
        ? newReport.title
        : `${match.homeTeam.name} vs ${match.awayTeam.name} の選手採点`,
    user,
    homeTeam: {
      id: match.homeTeam.id,
      ref: doc(db, 'teams', match.homeTeam.id),
      name: match.homeTeam.name,
      shortName: match.homeTeam.shortName,
      imageUrl: match.homeTeam.imageUrl,
      score: match.homeTeam.score!
    },
    awayTeam: {
      id: match.awayTeam.id,
      ref: doc(db, 'teams', match.awayTeam.id),
      name: match.awayTeam.name,
      shortName: match.awayTeam.shortName,
      imageUrl: match.awayTeam.imageUrl,
      score: match.awayTeam.score!
    },
    competition: {
      id: match.competition.id,
      ref: doc(db, 'competitions', match.competition.id),
      name: match.competition.name
    },
    jstDate: match.jstDate,
    yearMonth: match.jstDate.substring(0, 7),
    matchday: match.matchday,
    match: {
      id: match.id,
      ref: doc(db, 'matches', match.id)
    },
    selectTeam: newReport.selectTeam,
    momId: newReport.momId,
    summary: newReport.summary,
    teamIds: [match.homeTeam.id, match.awayTeam.id],
    publish: newReport.publish,
    likeCount: 0,
    frozen: false,
    createdAt: serverTimestamp()
  })
  if (newReport.selectTeam !== 'away') {
    newReport.homeTeamReportItems.forEach((htri) => {
      const htriRef = doc(db, 'reports', rId, 'home-team-report-items', htri.id).withConverter(
        reportItemConverter
      )
      batch.set(htriRef, { ...htri, user: { id: user.id, ref: user.ref } })
    })
  }
  if (newReport.selectTeam !== 'home') {
    newReport.awayTeamReportItems.forEach((atri) => {
      const atriRef = doc(db, 'reports', rId, 'away-team-report-items', atri.id).withConverter(
        reportItemConverter
      )
      batch.set(atriRef, { ...atri, user: { id: user.id, ref: user.ref } })
    })
  }
  if (loginUser) {
    const uRef = doc(db, 'users', loginUser.uid).withConverter(userConverter)
    batch.update(uRef, { [`reportCount`]: increment(1) })
  }
  await batch.commit()
  return rId
}

/** Reports Read */
export const fetchReport = async (
  reportId: string,
  uid?: string
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
    if (!resReport.publish && resReport.user.id !== uid) throw new Error('unauthorized access')
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
        if (doc.exists()) resHomeTeamReportItems.push(doc.data())
      })
    } else if (resReport.selectTeam === 'away') {
      const atriSnapshot = await getDocs(atriQ)
      atriSnapshot.forEach((doc) => {
        if (doc.exists()) resAwayTeamReportItems.push(doc.data())
      })
    } else {
      const htriSnapshot = await getDocs(htriQ)
      htriSnapshot.forEach((doc) => {
        if (doc.exists()) resHomeTeamReportItems.push(doc.data())
      })
      const atriSnapshot = await getDocs(atriQ)
      atriSnapshot.forEach((doc) => {
        if (doc.exists()) resAwayTeamReportItems.push(doc.data())
      })
    }
    return { resReport, resHomeTeamReportItems, resAwayTeamReportItems }
  } else {
    throw new Error('Not Found')
  }
}

export const toStoreReports = async (reports: {
  data: Report[]
  lastVisible: QueryDocumentSnapshot<Report> | null
  searchOption: SearchOption
  hasNext: boolean
}): Promise<void> => {
  const db = getFirestore()
  const rRef = collection(db, 'reports').withConverter(reportConverter)
  const options = makeSearchOption(reports.searchOption)
  const q = reports.lastVisible
    ? query(
        rRef,
        ...options,
        where('publish', '==', true),
        orderBy('createdAt', 'desc'),
        startAfter(reports.lastVisible),
        limit(perPage)
      )
    : query(
        rRef,
        ...options,
        where('publish', '==', true),
        orderBy('createdAt', 'desc'),
        limit(perPage)
      )
  const rSnapshot = await getDocs(q)
  rSnapshot.forEach((doc) => {
    if (doc.exists()) reports.data.push(doc.data())
  })
  reports.lastVisible = rSnapshot.docs[rSnapshot.size - 1]
  if (rSnapshot.size < perPage) reports.hasNext = false
}

export const toStorePopularReports = async (reports: {
  data: Report[]
  lastVisible: QueryDocumentSnapshot<Report> | null
  searchOption: SearchOption
  hasNext: boolean
}) => {
  const db = getFirestore()
  const rRef = collection(db, 'reports').withConverter(reportConverter)
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - 7)
  const q = query(
    rRef,
    where('publish', '==', true),
    orderBy('likeCount', 'desc'),
    orderBy('createdAt', 'desc'),
    startAt(startDate),
    limit(perPage)
  )
  const rSnapshot = await getDocs(q)
  rSnapshot.forEach((doc) => {
    if (doc.exists()) reports.data.push(doc.data())
  })
}

export const fetchSameMatchReports = async (
  matchId: string,
  reportId: string
): Promise<Report[]> => {
  const db = getFirestore()
  const rRef = collection(db, 'reports').withConverter(reportConverter)
  const q = query(
    rRef,
    where('match.id', '==', matchId),
    where('publish', '==', true),
    orderBy('createdAt', 'desc'),
    limit(4)
  )
  const rShapshot = await getDocs(q)
  const reports: Report[] = []
  rShapshot.forEach((doc) => {
    if (doc.exists() && doc.id !== reportId) reports.push(doc.data())
  })
  return reports
}

export const fetchUserReports = async (
  userId: string,
  lastVisible: QueryDocumentSnapshot<Report> | null
): Promise<{
  resReports: Report[]
  resLastVisible: QueryDocumentSnapshot<Report>
}> => {
  const db = getFirestore()
  const rRef = collection(db, 'reports').withConverter(reportConverter)
  const q = lastVisible
    ? query(
        rRef,
        where('user.id', '==', userId),
        orderBy('createdAt', 'desc'),
        startAfter(lastVisible),
        limit(perPage)
      )
    : query(rRef, where('user.id', '==', userId), orderBy('createdAt', 'desc'), limit(perPage))
  const rShapshot = await getDocs(q)
  const resReports: Report[] = []
  rShapshot.forEach((doc) => {
    if (doc.exists()) resReports.push(doc.data())
  })
  const resLastVisible = rShapshot.docs[rShapshot.size - 1]
  return { resReports, resLastVisible }
}

export const fetchUserLikeReports = async (
  userId: string,
  lastVisible: QueryDocumentSnapshot<Like> | null
): Promise<{
  resReports: Report[]
  resLastVisible: QueryDocumentSnapshot<Like>
}> => {
  const db = getFirestore()
  const lRef = collection(db, 'users', userId, 'likes').withConverter(likeConverter)
  const q = lastVisible
    ? query(lRef, orderBy('createdAt', 'desc'), startAfter(lastVisible), limit(perPage))
    : query(lRef, orderBy('createdAt', 'desc'), limit(perPage))
  const lShapshot = await getDocs(q)
  const reportIds: string[] = []
  lShapshot.forEach((doc) => {
    if (doc.exists()) reportIds.push(doc.data().report.id)
  })
  const resLastVisible = lShapshot.docs[lShapshot.size - 1]
  const resReports: Report[] = []
  if (reportIds.length > 0) {
    const rRef = collection(db, 'reports').withConverter(reportConverter)
    const q = query(rRef, where(documentId(), 'in', reportIds))
    const rSnapshot = await getDocs(q)
    rSnapshot.forEach((doc) => {
      if (doc.exists()) resReports.push(doc.data())
    })
  }
  return { resReports, resLastVisible }
}

export const toStoreSameMatchReports = async (
  matchId: string,
  match: { reports: Report[] }
): Promise<void> => {
  const db = getFirestore()
  const rRef = collection(db, 'reports').withConverter(reportConverter)
  const q = query(
    rRef,
    where('match.id', '==', matchId),
    where('publish', '==', true),
    orderBy('createdAt', 'desc'),
    limit(3)
  )
  const rSnapshot = await getDocs(q)
  rSnapshot.forEach((doc) => {
    if (doc.exists()) match.reports.push(doc.data())
  })
}

/** Reports Update */
export const putReport = async (editReport: InputReport, initReport: Report): Promise<void> => {
  const db = getFirestore()
  const batch = writeBatch(db)
  const rRef = doc(db, 'reports', initReport.id).withConverter(reportConverter)
  batch.update(rRef, {
    [`title`]:
      editReport.title !== ''
        ? editReport.title
        : `${initReport.homeTeam.name} vs ${initReport.awayTeam.name} の選手採点`,
    [`momId`]: editReport.momId,
    [`summary`]: editReport.summary,
    [`publish`]: editReport.publish
  })
  if (initReport.selectTeam !== 'away') {
    editReport.homeTeamReportItems.forEach((htri) => {
      const htriRef = doc(
        db,
        'reports',
        initReport.id,
        'home-team-report-items',
        htri.id
      ).withConverter(reportItemConverter)
      batch.update(htriRef, { [`point`]: htri.point, [`text`]: htri.text })
    })
  }
  if (initReport.selectTeam !== 'home') {
    editReport.awayTeamReportItems.forEach((atri) => {
      const htriRef = doc(
        db,
        'reports',
        initReport.id,
        'away-team-report-items',
        atri.id
      ).withConverter(reportItemConverter)
      batch.update(htriRef, { [`point`]: atri.point, [`text`]: atri.text })
    })
  }
  await batch.commit()
}

/** Reports Delete */
export const deleteReport = async (reportId: string, uid: string): Promise<void> => {
  const db = getFirestore()
  const batch = writeBatch(db)
  const rRef = doc(db, 'reports', reportId).withConverter(reportConverter)
  batch.delete(rRef)
  const uRef = doc(db, 'users', uid).withConverter(userConverter)
  batch.update(uRef, { [`reportCount`]: increment(-1) })
  await batch.commit()
}

/** Comments Create */
export const createComment = async (
  reportId: string,
  loginUser: LoginUser | null,
  text: string
) => {
  const db = getFirestore()
  const cColRef = collection(db, 'reports', reportId, 'comments')
  const cId = doc(cColRef).id
  const cRef = doc(db, 'reports', reportId, 'comments', cId).withConverter(commentConverter)
  const user = loginUser
    ? {
        id: loginUser.uid,
        ref: doc(db, 'users', loginUser.uid),
        name: loginUser.name,
        imageUrl: loginUser.imageUrl
      }
    : {
        id: 'guest',
        ref: doc(db, 'users', 'guest'),
        name: 'Guest',
        imageUrl: null
      }
  await setDoc(cRef, { id: cId, user, text, createdAt: serverTimestamp() })
}

/** Comments Read */
export const subscribeComments = async (
  reportId: string,
  comments: ReportComment[]
): Promise<Unsubscribe> => {
  const db = getFirestore()
  const cColRef = collection(db, 'reports', reportId, 'comments').withConverter(commentConverter)
  const firstQuery = query(cColRef, orderBy('createdAt', 'desc'), limit(30))
  const cShanpshot = await getDocs(firstQuery)
  cShanpshot.forEach((doc) => {
    if (doc.exists()) comments.unshift(doc.data())
  })
  let unsubscribe: Unsubscribe
  if (comments.length === 0) {
    unsubscribe = onSnapshot(firstQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'modified') comments.push(change.doc.data())
      })
    })
  } else {
    const latestData = comments[comments.length - 1]
    const addQuery = query(cColRef, orderBy('createdAt', 'desc'), endBefore(latestData.createdAt))
    unsubscribe = onSnapshot(addQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'modified') comments.push(change.doc.data())
      })
    })
  }
  return unsubscribe
}

/** Like */
export const doLike = async (uid: string, reportId: string) => {
  const db = getFirestore()
  const batch = writeBatch(db)
  const lRef = doc(db, 'users', uid, 'likes', reportId).withConverter(likeConverter)
  const rRef = doc(db, 'reports', reportId).withConverter(reportConverter)
  const lSnapshot = await getDoc(lRef)
  if (lSnapshot.exists()) {
    batch.delete(lRef)
    batch.update(rRef, { [`likeCount`]: increment(-1) })
  } else {
    batch.set(lRef, {
      id: reportId,
      report: { id: reportId, ref: rRef },
      createdAt: serverTimestamp()
    })
    batch.update(rRef, { [`likeCount`]: increment(1) })
  }
  await batch.commit()
}
