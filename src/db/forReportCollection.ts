import { doc, getDoc, getFirestore } from 'firebase/firestore'
import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot
} from 'firebase/firestore'

export const forReportConverter: FirestoreDataConverter<ForReport> = {
  toFirestore(forReport: ForReport): DocumentData {
    return {
      homePlayers: forReport.homePlayers,
      awayPlayers: forReport.awayPlayers,
      lastUpdated: forReport.lastUpdated
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): ForReport {
    const data = snapshot.data()
    return {
      id: snapshot.id,
      homePlayers: data.homePlayers,
      awayPlayers: data.awayPlayers,
      lastUpdated: data.lastUpdated
    }
  }
}

export const getForReport = async (matchId: string): Promise<ForReport | null> => {
  const db = getFirestore()
  const frRef = doc(db, 'matches', matchId, 'for-report', matchId).withConverter(forReportConverter)
  const frSnapshot = await getDoc(frRef)
  return frSnapshot.exists() ? frSnapshot.data() : null
}
