/** check */
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { reportConverter } from '../converters'

export const fetchReport = functions.region('asia-northeast1').https.onCall(async (data) => {
  const reportId = data.reportId as string
  const rRef = admin.firestore().doc(`reports/${reportId}`).withConverter(reportConverter)
  const rSnapshot = await rRef.get()
  return rSnapshot.exists ? rSnapshot.data() : null
})

export const fetchReports = functions
  .runWith({ memory: '1GB' })
  .region('asia-northeast1')
  .https.onCall(async () => {
    const rRef = admin
      .firestore()
      .collection(`reports`)
      .where('publish', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(10)
      .withConverter(reportConverter)
    const rSnapshot = await rRef.get()
    const reports: Report[] = []
    rSnapshot.forEach((doc) => {
      if (doc.exists) reports.push(doc.data())
    })
    return reports
  })
