import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import axios, { AxiosResponse } from 'axios'
import { standingsConverter } from '../converters'
import { config, footballUrl, leagueCompetitions } from '../utils'

const getStandings = async (competition: {
  id: number
  collectionId: string
}): Promise<Standings> => {
  const res: AxiosResponse<any, any> = await axios.get(
    footballUrl + `competitions/${competition.id}/standings`,
    config
  )
  const fbStandings = res.data as FbStandings
  return {
    id: fbStandings.season.startDate.substring(0, 4),
    season: fbStandings.season.startDate.substring(0, 4),
    table: fbStandings.standings[0].table.map((t) => {
      return {
        rank: t.position,
        team: {
          id: String(t.team.id),
          ref: admin.firestore().doc(`teams/${t.team.id}`),
          name: t.team.name,
          imageUrl: t.team.crestUrl
        },
        playedGames: t.playedGames,
        won: t.won,
        draw: t.draw,
        lost: t.lost,
        points: t.points,
        goalsFor: t.goalsFor,
        goalsAgainst: t.goalsAgainst,
        goalsDifference: t.goalDifference
      }
    })
  }
}

const setStandings = functions
  .region('asia-northeast1')
  .pubsub.schedule('0 6 * * *')
  .onRun(async () => {
    try {
      const batch = admin.firestore().batch()
      for (const competition of leagueCompetitions) {
        const standings = await getStandings(competition)
        const sRef = admin
          .firestore()
          .doc(`competitions/${competition.collectionId}/standings/${standings.season}`)
          .withConverter(standingsConverter)
        batch.set(sRef, standings)
      }
      await batch.commit()
      return `success setStandings ${new Date()}`
    } catch {
      return `error setStandings ${new Date()}`
    }
  })

export default setStandings
