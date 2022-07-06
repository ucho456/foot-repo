/** check */
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

export const updateEmailVerified = functions
  .region('asia-northeast1')
  .https.onCall(async (_, ctx) => {
    if (!ctx.auth || ctx.auth.uid) return null
    const uid = ctx.auth.uid
    await admin.auth().updateUser(uid, { emailVerified: true })
    return null
  })

export default updateEmailVerified
