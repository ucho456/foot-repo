import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const createUser = functions
  .region('asia-northeast1')
  .firestore.document('users/{userId}')
  .onCreate(async (_, context) => {
    const uid = context.params.userId
    await admin.auth().setCustomUserClaims(uid, {
      initSetting: true,
      suspended: false,
      subscription: false
    })
  })

export default createUser
