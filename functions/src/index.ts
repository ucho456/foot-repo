// firebase functions:shell シェル起動
// firebase functions:config:set foot-repo.key="value" 環境変数設定
// firebase functions:config:get > .runtimeconfig.json 環境変数書き出し

import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
admin.initializeApp()
const env = functions.config()['foot-repo']

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
    console.log(context)
    console.log('token', env.football_token)
    return null
  })
