// firebase functions:shell シェル起動

import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
admin.initializeApp()

export const initAuth = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async (user) => {
    await admin.auth().setCustomUserClaims(user.uid, {
      initSetting: false,
      suspended: false,
      subscription: false
    })
  })

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

export const aaa = functions
  .region('asia-northeast1')
  .pubsub.schedule('every 1 minutes')
  .onRun((context) => {
    console.log('this will be run every 1 minutes!', context)
    return null
  })
