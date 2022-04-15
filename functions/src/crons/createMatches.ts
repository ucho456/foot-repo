import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
const env = functions.config()['foot-repo']

const createMatches = functions
  .region('asia-northeast1')
  .pubsub.schedule('every 60 minutes')
  .onRun(async () => {
    const url = env.football_url + 'competitions/2000/teams'
    const config: AxiosRequestConfig<any> = { headers: { 'X-Auth-Token': env.football_token } }
    const res: AxiosResponse<any, any> = await axios.get(url, config)
    console.log(res.data)
    const batch = admin.firestore().batch()
    const ref = admin.firestore().doc(`matches/${123}`)
    batch.set(ref, { name: 'test' })
    await batch.commit()
    return null
  })

export default createMatches
