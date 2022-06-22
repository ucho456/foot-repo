import * as functions from 'firebase-functions'
// import * as admin from 'firebase-admin'

export const updateLike = functions.region('asia-northeast1').https.onCall((data, ctx) => {
  const uid = ctx.auth!.uid
  console.log({ data, uid })
  if (!uid) {
    return null
  }
  return { data, uid }
})

export default updateLike
