import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import type { DocumentReference } from 'firebase-admin/firestore'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

type Standings = {
  competitionRef: DocumentReference
  season: string
  table: {
    position: number
    teamId: number
    teamName: string
    teamImageUrl: string
    playedGames: number
    won: number
    draw: number
    lost: number
    points: number
    goalsFor: number
    goalsAgainst: number
    goalsDifference: number
  }[]
}

type ResData = {
  competition: {
    id: number
  }
  season: {
    startDate: string
  }
  standings: {
    table: {
      position: number
      team: {
        id: number
        name: string
        crestUrl: string
      }
      playedGames: number
      won: number
      draw: number
      lost: number
      points: number
      goalsFor: number
      goalsAgainst: number
      goalDifference: number
    }[]
  }[]
}

const env = functions.config()['foot-repo']
const footballUrl = env.football_url
const config: AxiosRequestConfig<any> = { headers: { 'X-Auth-Token': env.football_token } }

const getStandings = async (competition: {
  fbCompetitionId: number
  collectionId: string
}): Promise<Standings> => {
  const res: AxiosResponse<any, any> = await axios.get(
    footballUrl + `competitions/${competition.fbCompetitionId}/standings`,
    config
  )
  const resData = res.data as ResData
  const season = resData.season.startDate.substring(0, 4)
  const table = resData.standings[0].table.map((t) => {
    return {
      position: t.position,
      teamId: t.team.id,
      teamName: t.team.name,
      teamImageUrl: t.team.crestUrl,
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
  const cRef = await admin.firestore().doc(`competitions/${competition.collectionId}`)
  return { competitionRef: cRef, season, table }
}

const setStandings = functions
  .region('asia-northeast1')
  .pubsub.schedule('0 5 * * *') // every 05:00 AM
  .onRun(async () => {
    try {
      const batch = admin.firestore().batch()
      const competitions = [
        { fbCompetitionId: 2119, collectionId: 'J-League' },
        { fbCompetitionId: 2021, collectionId: 'Premier-League' },
        { fbCompetitionId: 2014, collectionId: 'LA-LIGA' },
        { fbCompetitionId: 2019, collectionId: 'Serie-A' },
        { fbCompetitionId: 2002, collectionId: 'Bundesliga' }
      ]
      for (let i = 0; i < competitions.length; i++) {
        const competition = competitions[i]
        const resStandings = await getStandings(competition)
        const sRef = admin
          .firestore()
          .doc(`competitions/${competition.collectionId}/standings/${resStandings.season}`)
        batch.set(sRef, resStandings)
      }
      await batch.commit()
    } catch (error) {
      console.log(error)
    }
    return null
  })

export default setStandings
