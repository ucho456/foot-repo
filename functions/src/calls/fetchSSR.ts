/** check */
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { matchConverter, reportConverter, reportItemConverter } from '../converters'

export default functions
  .runWith({
    memory: '256MB',
    minInstances: 0
  })
  .region('asia-northeast1')
  .https.onCall(async (data) => {
    const reportId = data.reportId as string | null
    if (reportId) {
      /** report page */
      const rRef = admin.firestore().doc(`reports/${reportId}`).withConverter(reportConverter)
      const rSnapshot = await rRef.get()
      const resReport = rSnapshot.data()
      if (resReport) {
        const htriRef = admin
          .firestore()
          .collection(`reports/${reportId}/home-team-report-items`)
          .orderBy('order', 'asc')
          .withConverter(reportItemConverter)
        const atriRef = admin
          .firestore()
          .collection(`reports/${reportId}/away-team-report-items`)
          .orderBy('order', 'asc')
          .withConverter(reportItemConverter)
        const resHomeTeamReportItems: ReportItem[] = []
        const resAwayTeamReportItems: ReportItem[] = []
        if (resReport.selectTeam !== 'away') {
          const htriSnapshot = await htriRef.get()
          htriSnapshot.forEach((doc) => {
            if (doc.exists) resHomeTeamReportItems.push(doc.data())
          })
        }
        if (resReport.selectTeam !== 'home') {
          const atriSnapshot = await atriRef.get()
          atriSnapshot.forEach((doc) => {
            if (doc.exists) resAwayTeamReportItems.push(doc.data())
          })
        }
        const mRef = admin
          .firestore()
          .doc(`matches/${resReport.match.id}`)
          .withConverter(matchConverter)
        const mSnapshot = await mRef.get()
        const resMatch = mSnapshot.data()
        return {
          result: 'success',
          resReport,
          resHomeTeamReportItems,
          resAwayTeamReportItems,
          resMatch
        }
      } else {
        return {
          result: 'failure',
          resReport: [],
          resHomeTeamReportItems: [],
          resAwayTeamReportItems: [],
          resMatch: {}
        }
      }
    } else {
      /** home page */
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
    }
  })
