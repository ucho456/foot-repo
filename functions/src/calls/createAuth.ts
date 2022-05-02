import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const createAuth = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async (user) => {
    try {
      await admin.auth().setCustomUserClaims(user.uid, {
        initSetting: false,
        suspended: false,
        subscription: false
      })
      return `success createAuth ${new Date()}`
    } catch {
      return `error createAuth ${new Date()}`
    }
  })

export default createAuth
