import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import axios, { AxiosResponse } from 'axios'
import { scorersConverter } from '../converters'
import { footballUrl, config } from '../utils'

const getScorers = async (competition: { id: number; collectionId: string }): Promise<Scorers> => {
  const res: AxiosResponse<any, any> = await axios.get(
    footballUrl + `competitions/${competition.id}/scorers?limit=30`,
    config
  )
  const fbScorers = res.data as FbScorers
  const season = fbScorers.season.startDate.substring(0, 4)
  const table = fbScorers.scorers.map((s) => {
    return {
      playerName: s.player.name,
      teamName: s.team.name,
      goals: s.numberOfGoals
    }
  })
  return { id: season, season, table }
}

const setScorers = functions
  .region('asia-northeast1')
  .pubsub.schedule('0 5 * * *') // every 05:00 AM
  .onRun(async () => {
    const batch = admin.firestore().batch()
    const competitions = [
      { id: 2119, collectionId: 'J-League' },
      { id: 2021, collectionId: 'Premier-League' },
      { id: 2014, collectionId: 'La-Liga' },
      { id: 2019, collectionId: 'Serie-A' },
      { id: 2002, collectionId: 'Bundesliga' }
    ]
    for (const competition of competitions) {
      const resScorers = await getScorers(competition)
      const sRef = admin
        .firestore()
        .doc(`competitions/${competition.collectionId}/scorers/${resScorers.season}`)
        .withConverter(scorersConverter)
      batch.set(sRef, resScorers)
    }
    await batch.commit()
    return `success setScorers ${new Date()}`
  })

export default setScorers
