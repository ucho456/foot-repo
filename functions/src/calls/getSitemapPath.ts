/** check */
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

const getSitemapPath = functions.region('asia-northeast1').https.onRequest(async (_, res) => {
  const rRef = admin.firestore().collection('reports')
  const rSnapshot = await rRef.get()
  const reportRoutes: string[] = []
  rSnapshot.forEach((doc) => {
    if (doc.exists) reportRoutes.push(`/reports/${doc.id}`)
  })
  res.send({ reportRoutes })
})

export default getSitemapPath
