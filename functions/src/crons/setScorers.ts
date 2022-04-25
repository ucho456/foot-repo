import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot
} from 'firebase-admin/firestore'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

type Scorers = {
  season: string
  table: {
    playerName: string
    teamName: string
    goals: number
  }[]
}

type ResData = {
  competition: {
    id: number
  }
  season: {
    startDate: string
  }
  scorers: {
    player: {
      name: string
    }
    team: {
      name: string
    }
    numberOfGoals: number
  }[]
}

const scorersConverter: FirestoreDataConverter<Scorers> = {
  toFirestore(scorers: Scorers): DocumentData {
    return {
      season: scorers.season,
      table: scorers.table
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Scorers {
    const data = snapshot.data()
    return {
      season: data.season,
      table: data.table
    }
  }
}

const env = functions.config()['foot-repo']
const footballUrl = env.football_url
const config: AxiosRequestConfig<any> = { headers: { 'X-Auth-Token': env.football_token } }

const getScorers = async (competition: { id: number; collectionId: string }): Promise<Scorers> => {
  const res: AxiosResponse<any, any> = await axios.get(
    footballUrl + `competitions/${competition.id}/scorers?limit=30`,
    config
  )
  const resData = res.data as ResData
  const season = resData.season.startDate.substring(0, 4)
  const table = resData.scorers.map((s) => {
    return {
      playerName: s.player.name,
      teamName: s.team.name,
      goals: s.numberOfGoals
    }
  })
  return { season, table }
}

const setScorers = functions
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
        const resScorers = await getScorers(competition)
        const sRef = admin
          .firestore()
          .doc(`competitions/${competition.collectionId}/scorers/${resScorers.season}`)
          .withConverter(scorersConverter)
        batch.set(sRef, resScorers)
      }
      await batch.commit()
    } catch (error) {
      console.log(error)
    }
    return null
  })

export default setScorers
