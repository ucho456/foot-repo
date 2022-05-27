import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import axios, { AxiosResponse } from 'axios'
import { scorersConverter } from '../converters'
import { config, footballUrl, leagueCompetitions } from '../utils'

const getScorers = async (competition: { id: number; collectionId: string }): Promise<Scorers> => {
  const res: AxiosResponse<any, any> = await axios.get(
    footballUrl + `competitions/${competition.id}/scorers`,
    config
  )
  const fbScorers = res.data as FbScorers
  const goals = fbScorers.scorers.map((s) => s.numberOfGoals)
  const sorted = goals.slice().sort((a, b) => b - a)
  const ranks = goals.map((g) => sorted.indexOf(g) + 1)
  return {
    id: fbScorers.season.startDate.substring(0, 4),
    season: fbScorers.season.startDate.substring(0, 4),
    table: fbScorers.scorers.map((s, i) => {
      return {
        keyId: String(i),
        rank: ranks[i],
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
