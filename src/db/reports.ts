import { Ref } from '@nuxtjs/composition-api'
import {
  collection,
  doc,
  documentId,
  endAt,
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
import { getFunctions, httpsCallable } from 'firebase/functions'
import {
  commentConverter,
  likeConverter,
  reportConverter,
  reportItemConverter,
  userConverter
} from '@/utils/converters'
import { makeSearchOption } from '@/utils/searchOption'

export const createReport = async (
  loginUser: LoginUser | null,
  inputReport: InputReport,
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
        ref: doc(db, `users/${loginUser.uid}`),
        name: loginUser.name,
        imageUrl: loginUser.imageUrl
      }
    : { id: 'guest', ref: doc(db, 'users/guest'), name: 'Guest', imageUrl: null }

  batch.set(rRef, {
    id: rId,
    title:
      inputReport.title !== ''
        ? inputReport.title
        : `${match.homeTeam.name} vs ${match.awayTeam.name} の選手採点`,
    user,
    homeTeam: {
      id: match.homeTeam.id,
      ref: doc(db, `teams/${match.homeTeam.id}`),
      name: match.homeTeam.name,
      shortName: match.homeTeam.shortName,
      imageUrl: match.homeTeam.imageUrl,
      score: match.homeTeam.score!
    },
    awayTeam: {
      id: match.awayTeam.id,
      ref: doc(db, `teams/${match.awayTeam.id}`),
      name: match.awayTeam.name,
      shortName: match.awayTeam.shortName,
      imageUrl: match.awayTeam.imageUrl,
      score: match.awayTeam.score!
    },
    competition: {
      id: match.competition.id,
      ref: doc(db, `competitions/${match.competition.id}`),
      name: match.competition.name
    },
    jstDate: match.jstDate,
    matchday: match.matchday,
    match: {
      id: match.id,
      ref: doc(db, `matches/${match.id}`)
    },
    selectTeam: inputReport.selectTeam,
    momId: inputReport.momId,
    summary: inputReport.summary,
    teamIds: [match.homeTeam.id, match.awayTeam.id],
    publish: inputReport.publish,
    likeCount: 0,
    frozen: false,
    createdAt: serverTimestamp()
  })

  inputReport.homeTeamReportItems.forEach((htri) => {
    const htriRef = doc(db, 'reports', rId, 'home-team-report-items', htri.id).withConverter(
      reportItemConverter
    )
    batch.set(htriRef, { ...htri, user: { id: user.id, ref: user.ref } })
  })

  inputReport.awayTeamReportItems.forEach((atri) => {
    const atriRef = doc(db, 'reports', rId, 'away-team-report-items', atri.id).withConverter(
      reportItemConverter
    )
    batch.set(atriRef, { ...atri, user: { id: user.id, ref: user.ref } })
  })

  if (loginUser) {
    const uRef = doc(db, 'users', loginUser.uid).withConverter(userConverter)
    batch.update(uRef, { [`reportCount`]: increment(1) })
  }
  await batch.commit()
  return rId
}

const perPage = 10
export const toStoreFirstReports = async (reports: {
  data: Report[]
  lastVisible: QueryDocumentSnapshot<Report> | null
  searchOption: SearchOption
}): Promise<void> => {
  reports.data = []
  const db = getFirestore()
  const rRef = collection(db, 'reports').withConverter(reportConverter)
  const options = makeSearchOption(reports.searchOption)
  const q = query(
    rRef,
    ...options,
    where('publish', '==', true),
    orderBy('createdAt', 'desc'),
    limit(perPage)
  )
  const rSnapshot = await getDocs(q)
  rSnapshot.forEach((doc) => {
    if (doc.exists()) {
      reports.data.push(doc.data())
    }
  })
  reports.lastVisible = rSnapshot.docs[rSnapshot.docs.length - 1]
}

export const toStoreNextReports = async (
  reports: {
    data: Report[]
    lastVisible: QueryDocumentSnapshot<Report> | null
    searchOption: SearchOption
  },
  hasNextPage: Ref<boolean>
): Promise<void> => {
  const db = getFirestore()
  const rRef = collection(db, 'reports').withConverter(reportConverter)
  const options = makeSearchOption(reports.searchOption)
  const q = query(
    rRef,
    ...options,
    where('publish', '==', true),
    orderBy('createdAt', 'desc'),
    startAfter(reports.lastVisible),
    limit(perPage)
  )
  const rSnapshot = await getDocs(q)
  rSnapshot.forEach((doc) => {
    if (doc.exists()) {
      reports.data.push(doc.data())
    }
  })
  if (rSnapshot.size === 0) {
    hasNextPage.value = false
  }
  reports.lastVisible = rSnapshot.docs[rSnapshot.docs.length - 1]
}

export const toStorePopularReports = async (reports: {
  data: Report[]
  lastVisible: QueryDocumentSnapshot<Report> | null
  searchOption: SearchOption
}) => {
  reports.data = []
  const db = getFirestore()
  const rRef = collection(db, 'reports').withConverter(reportConverter)
  const endDate = new Date()
  endDate.setDate(endDate.getDate() + 1)
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - 7)
  const q = query(
    rRef,
    where('publish', '==', true),
    orderBy('createdAt', 'asc'),
    orderBy('likeCount', 'desc'),
    startAt(startDate),
    endAt(endDate),
    limit(perPage)
  )
  const rSnapshot = await getDocs(q)
  rSnapshot.forEach((doc) => {
    if (doc.exists()) {
      reports.data.push(doc.data())
    }
  })
}

export const fetchReportAndItems = async (
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
    if (!resReport.publish && resReport.user.ref.id !== uid) {
      throw new Error('unauthorized access')
    }
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

// query で doc.id != reportId をしたい
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
    if (doc.exists() && doc.id !== reportId) {
      reports.push(doc.data())
    }
  })
  return reports
}

export const fetchUserReports = async (userId: string): Promise<Report[]> => {
  const db = getFirestore()
  const rRef = collection(db, 'reports').withConverter(reportConverter)
  const uRef = doc(db, 'users', userId)
  const q = query(rRef, where('user.ref', '==', uRef), orderBy('createdAt', 'desc'))
  const rShapshot = await getDocs(q)
  const reports: Report[] = []
  rShapshot.forEach((doc) => {
    if (doc.exists()) {
      reports.push(doc.data())
    }
  })
  return reports
}

export const fetchUserLikeReports = async (userId: string): Promise<Report[]> => {
  const db = getFirestore()
  const lRef = collection(db, 'users', userId, 'likes').withConverter(likeConverter)
  const lQuery = query(lRef, orderBy('createdAt', 'desc'), limit(10))
  const lShapshot = await getDocs(lQuery)
  const reportIds: string[] = []
  lShapshot.forEach((doc) => {
    if (doc.exists()) reportIds.push(doc.data().report.id)
  })
  const reports: Report[] = []
  if (reportIds.length > 0) {
    const rRef = collection(db, 'reports').withConverter(reportConverter)
    const rQuery = query(rRef, where(documentId(), 'in', reportIds))
    const rSnapshot = await getDocs(rQuery)
    rSnapshot.forEach((doc) => {
      if (doc.exists()) reports.push(doc.data())
    })
  }
  return reports
}

export const subscribeComments = async (
  reportId: string,
  comments: ReportComment[]
): Promise<Unsubscribe> => {
  const db = getFirestore()
  const cColRef = collection(db, 'reports', reportId, 'comments').withConverter(commentConverter)
  const firstQuery = query(cColRef, orderBy('createdAt', 'desc'), limit(100))
  const cShanpshot = await getDocs(firstQuery)
  cShanpshot.forEach((doc) => {
    if (doc.exists()) {
      comments.unshift(doc.data())
    }
  })

  let unsubscribe: Unsubscribe
  if (comments.length === 0) {
    unsubscribe = onSnapshot(firstQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'modified') {
          comments.push(change.doc.data())
        }
      })
    })
  } else {
    const latestData = comments[comments.length - 1]
    const addQuery = query(cColRef, orderBy('createdAt', 'desc'), endBefore(latestData.createdAt))
    unsubscribe = onSnapshot(addQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'modified') {
          comments.push(change.doc.data())
        }
      })
    })
  }

  return unsubscribe
}

export const createComment = async (
  reportId: string,
  loginUser: LoginUser | null,
  text: string
) => {
  const db = getFirestore()
  const cColRef = collection(db, 'reports', reportId, 'comments')
  const cId = doc(cColRef).id
  const cRef = doc(db, 'reports', reportId, 'comments', cId).withConverter(commentConverter)
  await setDoc(cRef, {
    id: cId,
    user: loginUser
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
        },
    text,
    createdAt: serverTimestamp()
  })
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
    if (doc.exists()) {
      match.reports.push(doc.data())
    }
  })
}

export const deleteReport = async (reportId: string, uid: string): Promise<void> => {
  const db = getFirestore()
  const batch = writeBatch(db)
  const rRef = doc(db, 'reports', reportId).withConverter(reportConverter)
  batch.delete(rRef)
  const uRef = doc(db, 'users', uid).withConverter(userConverter)
  batch.update(uRef, { [`reportCount`]: increment(-1) })
  await batch.commit()
}

export const updateReport = async (inputReport: InputReport, initReport: Report): Promise<void> => {
  const db = getFirestore()
  const batch = writeBatch(db)
  const rRef = doc(db, 'reports', initReport.id).withConverter(reportConverter)
  batch.update(rRef, {
    [`title`]:
      inputReport.title !== ''
        ? inputReport.title
        : `${initReport.homeTeam.name} vs ${initReport.awayTeam.name} の選手採点`,
    [`selectTeam`]: inputReport.selectTeam,
    [`momId`]: inputReport.momId,
    [`summary`]: inputReport.summary,
    [`publish`]: inputReport.publish
  })

  inputReport.homeTeamReportItems.forEach((htri) => {
    const htriRef = doc(
      db,
      'reports',
      initReport.id,
      'home-team-report-items',
      htri.id
    ).withConverter(reportItemConverter)
    batch.update(htriRef, { [`point`]: htri.point, [`text`]: htri.text })
  })

  inputReport.awayTeamReportItems.forEach((atri) => {
    const htriRef = doc(
      db,
      'reports',
      initReport.id,
      'away-team-report-items',
      atri.id
    ).withConverter(reportItemConverter)
    batch.update(htriRef, { [`point`]: atri.point, [`text`]: atri.text })
  })

  await batch.commit()
}

export const updateLikeCount = async (reportId: string, like: boolean) => {
  const functions = getFunctions(undefined, 'asia-northeast1')
  const updateLike = httpsCallable(functions, 'updateLike')
  await updateLike({ reportId, like })
}
