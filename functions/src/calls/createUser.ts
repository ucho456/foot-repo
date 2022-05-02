import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const createUser = functions
  .region('asia-northeast1')
  .firestore.document('users/{userId}')
  .onCreate(async (_, context) => {
    try {
      const uid = context.params.userId
      await admin.auth().setCustomUserClaims(uid, {
        initSetting: true,
        suspended: false,
        subscription: false
      })
      return `success createUser ${new Date()}`
    } catch {
      return `error createUser ${new Date()}`
    }
  })

export default createUser
