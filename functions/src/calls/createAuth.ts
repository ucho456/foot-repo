import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const createAuth = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async (user) => {
    await admin.auth().setCustomUserClaims(user.uid, {
      initSetting: false,
      suspended: false,
      subscription: false
    })
  })

export default createAuth
