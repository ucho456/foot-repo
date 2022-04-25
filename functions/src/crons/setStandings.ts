import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import type {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot
} from 'firebase-admin/firestore'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

type Standings = {
  id: string
  season: string
  table: {
    position: number
    team: {
      ref: DocumentReference
      id: number
      name: string
      imageUrl: string
    }
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

const standingsConverter: FirestoreDataConverter<Standings> = {
  toFirestore(standings: Standings): DocumentData {
    return {
      season: standings.season,
      table: standings.table
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Standings {
    const data = snapshot.data()
    return {
      id: snapshot.id,
      season: data.season,
      table: data.table
    }
  }
}

const env = functions.config()['foot-repo']
const footballUrl = env.football_url
const config: AxiosRequestConfig<any> = { headers: { 'X-Auth-Token': env.football_token } }

const getStandings = async (competition: {
  id: number
  collectionId: string
}): Promise<Standings> => {
  const res: AxiosResponse<any, any> = await axios.get(
    footballUrl + `competitions/${competition.id}/standings`,
    config
  )
  const resData = res.data as ResData
  const season = resData.season.startDate.substring(0, 4)
  const table = resData.standings[0].table.map((t) => {
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
  .pubsub.schedule('0 5 * * *') // every 05:00 AM
  .onRun(async () => {
    try {
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
    } catch (error) {
      console.log(error)
    }
    return null
  })

export default setStandings
