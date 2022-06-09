import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const updateEmailVerified = functions
  .region('asia-northeast1')
  .https.onCall(async (_, ctx) => {
    const uid = ctx.auth!.uid
    if (!uid) {
      return null
    }
    await admin.auth().updateUser(uid, { emailVerified: true })
    return null
  })

export default updateEmailVerified
