import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { likeConverter, reportConverter } from '../converters'

export const updateLike = functions.region('asia-northeast1').https.onCall(async (data, ctx) => {
  const db = admin.firestore()
  const uid = ctx.auth!.uid
  const reportId = data.reportId as string
  if (!uid) {
    return null
  }
  const lRef = db.doc(`users/${uid}/likes/${reportId}`).withConverter(likeConverter)
  const rRef = db.doc(`reports/${reportId}`).withConverter(reportConverter)
  const lSnapshot = await lRef.get()
  const batch = db.batch()
  if (lSnapshot.exists) {
    batch.delete(lRef)
    batch.update(rRef, {
      [`likeCount`]: admin.firestore.FieldValue.increment(-1)
    })
  } else {
    batch.set(lRef, {
      id: reportId,
      report: { id: reportId, ref: rRef },
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    })
    batch.update(rRef, {
      [`likeCount`]: admin.firestore.FieldValue.increment(1)
    })
  }
  await batch.commit()
  return null
})

export default updateLike
