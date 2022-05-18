import { collection, doc, getFirestore, serverTimestamp, writeBatch } from 'firebase/firestore'
import { reportItemConverter, reportConverter } from '@/utils/converters'

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
      name: match.homeTeam.name,
      score: match.homeTeam.score!
    },
    awayTeam: {
      name: match.awayTeam.name,
      score: match.awayTeam.score!
    },
    competition: {
      id: match.competition.id,
      name: match.competition.name
    },
    jstDate: match.jstDate,
    match: {
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
