import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import type {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot
} from 'firebase-admin/firestore'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

type Scorers = {
  competitionRef: DocumentReference
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
      competitionRef: scorers.competitionRef,
      season: scorers.season,
      table: scorers.table
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Scorers {
    const data = snapshot.data()
    return {
      competitionRef: data.competitionRef,
      season: data.season,
      table: data.table
    }
  }
}

const env = functions.config()['foot-repo']
const footballUrl = env.football_url
const config: AxiosRequestConfig<any> = { headers: { 'X-Auth-Token': env.football_token } }

const getScorers = async (competition: {
  fbCompetitionId: number
  collectionId: string
}): Promise<Scorers> => {
  const res: AxiosResponse<any, any> = await axios.get(
    footballUrl + `competitions/${competition.fbCompetitionId}/scorers?limit=30`,
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
  const cRef = await admin.firestore().doc(`competitions/${competition.collectionId}`)
  return { competitionRef: cRef, season, table }
}

const setScorers = functions
  .region('asia-northeast1')
  .pubsub.schedule('0 5 * * *') // every 05:00 AM
  .onRun(async () => {
    try {
      const batch = admin.firestore().batch()
      const competitions = [
        { fbCompetitionId: 2119, collectionId: 'J-League' },
        { fbCompetitionId: 2021, collectionId: 'Premier-League' },
        { fbCompetitionId: 2014, collectionId: 'La-Liga' },
        { fbCompetitionId: 2019, collectionId: 'Serie-A' },
        { fbCompetitionId: 2002, collectionId: 'Bundesliga' }
      ]
      for (let i = 0; i < competitions.length; i++) {
        const competition = competitions[i]
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
