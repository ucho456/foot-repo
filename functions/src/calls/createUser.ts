/** check */
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

export const createUser = functions
  .region('asia-northeast1')
  .firestore.document('users/{userId}')
  .onCreate(async (_, ctx) => {
    const uid = ctx.params.userId as string
    await admin.auth().setCustomUserClaims(uid, {
      initSetting: true,
      suspended: false,
      subscription: false
    })
    return null
  })

export default createUser
