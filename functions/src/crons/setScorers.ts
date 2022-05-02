import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import axios, { AxiosResponse } from 'axios'
import { Scorers } from '../@types/competitions'
import { scorersConverter } from '../converters'
import { config, footballUrl, leagueCompetitions } from '../utils'

const getScorers = async (competition: { id: number; collectionId: string }): Promise<Scorers> => {
  const res: AxiosResponse<any, any> = await axios.get(
    footballUrl + `competitions/${competition.id}/scorers?limit=30`,
    config
  )
  const fbScorers = res.data as FbScorers
  return {
    id: fbScorers.season.startDate.substring(0, 4),
    season: fbScorers.season.startDate.substring(0, 4),
    table: fbScorers.scorers.map((s) => {
      return {
        playerName: s.player.name,
        teamName: s.team.name,
        goals: s.numberOfGoals
      }
    })
  }
}

const setScorers = functions
  .region('asia-northeast1')
  .pubsub.schedule('5 5 * * *')
  .onRun(async () => {
    try {
      const batch = admin.firestore().batch()
      for (const competition of leagueCompetitions) {
        const scorers = await getScorers(competition)
        const sRef = admin
          .firestore()
          .doc(`competitions/${competition.collectionId}/scorers/${scorers.season}`)
          .withConverter(scorersConverter)
        batch.set(sRef, scorers)
      }
      await batch.commit()
      return `success setScorers ${new Date()}`
    } catch {
      return `error setScorers ${new Date()}`
    }
  })

export default setScorers
