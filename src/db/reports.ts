import { collection, doc, getFirestore, serverTimestamp, writeBatch } from 'firebase/firestore'
import { reportConverter } from '@/utils/converters'

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
    user: {
      ref: doc(db, `users/${currentUser?.uid}`),
      name: currentUser?.name!,
      imageUrl: currentUser?.imageUrl
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
  await batch.commit()
}
