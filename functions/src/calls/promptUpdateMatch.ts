/** check */
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { forReportConverter, matchConverter, matchDetailConverter } from '../converters'
import { makeMatch } from '../calls/createMatches'
import { getFbMatch, makeForReport, makeMatchDetail } from '../crons/setMatches'

export const promptUpdateMatch = functions
  .region('asia-northeast1')
  .https.onCall(async (data, ctx) => {
    if (!ctx.auth || ctx.auth.uid) return 'failure'
    const matchId = data.matchId as string
    const fbMatch = await getFbMatch(matchId)
    if (fbMatch.status === 'SCHEDULED') {
      return 'not yet'
    } else {
      const batch = admin.firestore().batch()
      const mRef = admin.firestore().doc(`matches/${fbMatch.id}`).withConverter(matchConverter)
      const mSnapshot = await mRef.get()
      const matchData = mSnapshot.data()
      if (!matchData) return 'failure'
      if (matchData.status === 'FINISHED') return 'already updated'
      const competition = {
        id: 0,
        collectionId: matchData.competition.id,
        name: matchData.competition.name
      }
      const match = makeMatch(fbMatch, competition)
      batch.set(mRef, match)
      const mdRef = admin
        .firestore()
        .doc(`matches/${fbMatch.id}/match-detail/${fbMatch.id}`)
        .withConverter(matchDetailConverter)
      const matchDetail = makeMatchDetail(fbMatch)
      batch.set(mdRef, matchDetail)
      const frRef = admin
        .firestore()
        .doc(`matches/${fbMatch.id}/for-report/${fbMatch.id}`)
        .withConverter(forReportConverter)
      const forReport = makeForReport(fbMatch)
      batch.set(frRef, forReport)
      await batch.commit()
      return 'success'
    }
  })
