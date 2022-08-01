/** check */
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import axios, { AxiosResponse } from 'axios'
import { scorersConverter } from '../converters'
import { config, footballUrl, competitions } from '../utils'

const getScorers = async (competition: { id: number; collectionId: string }): Promise<Scorers> => {
  const res: AxiosResponse<any, any> = await axios.get(
    footballUrl + `competitions/${competition.id}/scorers`,
    config
  )
  const fbScorers = res.data as FbScorers
  const goals = fbScorers.scorers.map((s) => s.goals || 0)
  const sorted = goals.slice().sort((a, b) => b - a)
  const ranks = goals.map((g) => sorted.indexOf(g) + 1)
  return {
    id: fbScorers.season.startDate.substring(0, 4),
    season: fbScorers.season.startDate.substring(0, 4),
    table: fbScorers.scorers.map((s, i) => {
      return {
        keyId: String(i),
        rank: ranks[i],
        player: {
          id: String(s.player.id),
          name: s.player.name
        },
        team: {
          id: String(s.team.id),
          ref: admin.firestore().doc(`teams/${s.team.id}`),
          name: s.team.name,
          imageUrl: s.team.crest
        },
        goals: s.goals || 0,
        assists: s.assists || 0,
        penalties: s.penalties || 0
      }
    })
  }
}

const setScorers = functions
  .region('asia-northeast1')
  .pubsub.schedule('18 5 * * *')
  .onRun(async () => {
    const batch = admin.firestore().batch()
    for (const competition of competitions) {
      try {
        const scorers = await getScorers(competition)
        const sRef = admin
          .firestore()
          .doc(`competitions/${competition.collectionId}/scorers/${scorers.season}`)
          .withConverter(scorersConverter)
        batch.set(sRef, scorers)
      } catch {}
    }
    await batch.commit()
    return null
  })

export default setScorers
