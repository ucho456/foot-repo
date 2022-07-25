/** check */
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { forReportConverter, matchConverter, matchDetailConverter } from '../converters'
import { env } from '../utils'

/** change here */
import useJapanMatchData from '../japan/20220719japan'

export const createJapanMatch = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    if (process.env.NODE_ENV === 'production' && req.query.secret !== env.secret) {
      throw new Error('Unauthorized')
    }
    const { forReport, match, matchDetail, matchId } = useJapanMatchData()
    const batch = admin.firestore().batch()
    const mRef = admin.firestore().doc(`matches/${matchId}`).withConverter(matchConverter)
    batch.set(mRef, match)
    if (match.status === 'FINISHED') {
      const mdRef = admin
        .firestore()
        .doc(`matches/${matchId}/match-detail/${matchId}`)
        .withConverter(matchDetailConverter)
      batch.set(mdRef, matchDetail)
      const frRef = admin
        .firestore()
        .doc(`matches/${matchId}/for-report/${matchId}`)
        .withConverter(forReportConverter)
      batch.set(frRef, forReport)
    }
    await batch.commit()
    res.sendStatus(200)
  })
