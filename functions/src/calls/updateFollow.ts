import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { followerConverter, userConverter } from '../converters'

export const updateFollow = functions.region('asia-northeast1').https.onCall(async (data, ctx) => {
  const db = admin.firestore()
  const uid = ctx.auth!.uid
  const userId = data.userId as string
  if (!uid) return null
  const meRef = db.doc(`users/${uid}`).withConverter(userConverter)
  const meFollowRef = db.doc(`users/${uid}/follows/${userId}`).withConverter(followerConverter)
  const youRef = db.doc(`users/${userId}`).withConverter(userConverter)
  const youFollowerRef = db.doc(`users/${userId}/followers/${uid}`).withConverter(followerConverter)

  const batch = db.batch()
  const meSnapshot = await meRef.get()
  const youSnapshot = await youRef.get()
  const followSnapshot = await meFollowRef.get()
  if (followSnapshot.exists) {
    batch.update(meRef, { [`followCount`]: admin.firestore.FieldValue.increment(-1) })
    batch.delete(meFollowRef)
    batch.update(youRef, { [`followerCount`]: admin.firestore.FieldValue.increment(-1) })
    batch.delete(youFollowerRef)
  } else {
    batch.update(meRef, { [`followCount`]: admin.firestore.FieldValue.increment(1) })
    const you = youSnapshot.data()!
    batch.set(meFollowRef, {
      id: userId,
      user: { id: userId, ref: youRef, name: you.name, imageUrl: you.imageUrl },
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    })
    batch.update(youRef, { [`followerCount`]: admin.firestore.FieldValue.increment(1) })
    const me = meSnapshot.data()!
    batch.set(youFollowerRef, {
      id: uid,
      user: { id: uid, ref: meRef, name: me.name, imageUrl: me.imageUrl },
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    })
  }
  await batch.commit()
  return null
})

export default updateFollow
