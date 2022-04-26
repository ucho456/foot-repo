import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import axios, { AxiosResponse } from 'axios'
import { Standings } from '../@types/standings' // 何故か読み込めないのでインポート中
import { standingsConverter } from '../converters'
import { footballUrl, config } from '../utils'

const getStandings = async (competition: {
  id: number
  collectionId: string
}): Promise<Standings> => {
  const res: AxiosResponse<any, any> = await axios.get(
    footballUrl + `competitions/${competition.id}/standings`,
    config
  )
  const fbStandings = res.data as FbStandings
  const season = fbStandings.season.startDate.substring(0, 4)
  const table = fbStandings.standings[0].table.map((t) => {
    return {
      position: t.position,
      team: {
        ref: admin.firestore().doc(`teams/${t.team.id}`),
        id: t.team.id,
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
  return { id: season, season, table }
}

const setStandings = functions
  .region('asia-northeast1')
  .pubsub.schedule('0 5 * * *')
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
      const resStandings = await getStandings(competition)
      const sRef = admin
        .firestore()
        .doc(`competitions/${competition.collectionId}/standings/${resStandings.season}`)
        .withConverter(standingsConverter)
      batch.set(sRef, resStandings)
    }
    await batch.commit()
    return `success setStandings ${new Date()}`
  })

export default setStandings
