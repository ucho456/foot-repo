import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import type {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  QueryDocumentSnapshot
} from 'firebase-admin/firestore'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { convertJST } from '../utils'

type Match = {
  id: number
  season: string
  jstDate: string
  matchday: number
  status: 'SCHEDULED' | 'FINISHED'
  teamIds: number[]
  homeTeam: {
    ref: DocumentReference
    id: number
    name: string
    score: number | null
    penalty: number | null
    goalPlayers: {
      minute: number
      name: string
    }[]
  }
  awayTeam: {
    ref: DocumentReference
    id: number
    name: string
    score: number | null
    penalty: number | null
    goalPlayers: {
      minute: number
      name: string
    }[]
  }
  lastUpdated: string
}

type ResMatch = {
  id: number
  season: {
    startDate: string
  }
  utcDate: string
  status: 'SCHEDULED' | 'FINISHED'
  matchday: number
  score: {
    fullTime: {
      homeTeam: null | number
      awayTeam: null | number
    }
    penalties: {
      homeTeam: null | number
      awayTeam: null | number
    }
  }
  homeTeam: {
    id: number
    name: string
  }
  awayTeam: {
    id: number
    name: string
  }
  goals: {
    minute: number
    team: {
      id: number
    }
    scorer: {
      name: string
    }
  }[]
  lastUpdated: string
}

const matchConverter: FirestoreDataConverter<Match> = {
  toFirestore(match: Match): DocumentData {
    return {
      season: match.season,
      jstDate: match.jstDate,
      matchday: match.matchday,
      status: match.status,
      teamIds: match.teamIds,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      lastUpdated: match.lastUpdated
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Match {
    const data = snapshot.data()
    return {
      id: data.id,
      season: data.season,
      jstDate: data.jstDate,
      matchday: data.matchday,
      status: data.status,
      teamIds: data.teamIds,
      homeTeam: data.homeTeam,
      awayTeam: data.awayTeam,
      lastUpdated: data.lastUpdated
    }
  }
}

const env = functions.config()['foot-repo']
const footballUrl = env.football_url
const config: AxiosRequestConfig<any> = { headers: { 'X-Auth-Token': env.football_token } }

const getResMatches = async (competitionId: number): Promise<ResMatch[]> => {
  const res: AxiosResponse<any, any> = await axios.get(
    footballUrl + `competitions/${competitionId}/matches`,
    config
  )
  const matches = res.data.matches as ResMatch[]
  return matches
}

const makeMatch = (resMatch: ResMatch): Match => {
  return {
    id: resMatch.id,
    season: resMatch.season.startDate.substring(0, 4),
    jstDate: convertJST(resMatch.utcDate),
    matchday: resMatch.matchday,
    status: resMatch.status,
    teamIds: [resMatch.homeTeam.id, resMatch.awayTeam.id],
    homeTeam: {
      ref: admin.firestore().doc(`teams/${resMatch.homeTeam.id}`),
      id: resMatch.homeTeam.id,
      name: resMatch.homeTeam.name,
      score: resMatch.score.fullTime.homeTeam,
      penalty: resMatch.score.penalties.homeTeam,
      goalPlayers: resMatch.goals.flatMap((g) => {
        if (g.team.id !== resMatch.homeTeam.id) return []
        return { minute: g.minute, name: g.scorer.name }
      })
    },
    awayTeam: {
      ref: admin.firestore().doc(`teams/${resMatch.awayTeam.id}`),
      id: resMatch.awayTeam.id,
      name: resMatch.awayTeam.name,
      score: resMatch.score.fullTime.awayTeam,
      penalty: resMatch.score.penalties.awayTeam,
      goalPlayers: resMatch.goals.flatMap((g) => {
        if (g.team.id !== resMatch.awayTeam.id) return []
        return { minute: g.minute, name: g.scorer.name }
      })
    },
    lastUpdated: resMatch.lastUpdated
  }
}

const setMatches = async (competition: { id: number; collectionId: string }): Promise<void> => {
  try {
    const resMatches = await getResMatches(competition.id)
    const batch = admin.firestore().batch()
    for (const resMatch of resMatches) {
      const mRef = admin.firestore().doc(`matches/${resMatch.id}`).withConverter(matchConverter)
      const mSnapshot = await mRef.get()
      if (mSnapshot.exists) {
        const lastUpdated = mSnapshot.data()?.lastUpdated
        if (resMatch.lastUpdated !== lastUpdated) {
          const match = makeMatch(resMatch)
          batch.set(mRef, match)
        }
      } else {
        const match = makeMatch(resMatch)
        batch.set(mRef, match)
      }
    }
    await batch.commit()
  } catch (error) {
    console.log(error)
  }
}

export const setJLeagueMatches = functions
  .region('asia-northeast1')
  .pubsub.schedule('0 4 * * *') // every 04:00 AM
  .onRun(async () => {
    const competition = { id: 2119, collectionId: 'J-League' }
    await setMatches(competition)
    return null
  })

export const setPremierLeagueMatches = functions
  .region('asia-northeast1')
  .pubsub.schedule('5 4 * * *') // every 04:05 AM
  .onRun(async () => {
    const competition = { id: 2021, collectionId: 'Premier-League' }
    await setMatches(competition)
    return null
  })

export const setLaLigaMatches = functions
  .region('asia-northeast1')
  .pubsub.schedule('10 4 * * *') // every 04:10 AM
  .onRun(async () => {
    const competition = { id: 2014, collectionId: 'La-Liga' }
    await setMatches(competition)
    return null
  })

export const setSerieAMatches = functions
  .region('asia-northeast1')
  .pubsub.schedule('15 4 * * *') // every 04:15 AM
  .onRun(async () => {
    const competition = { id: 2019, collectionId: 'Seria-A' }
    await setMatches(competition)
    return null
  })

export const setBundesligaMatches = functions
  .region('asia-northeast1')
  .pubsub.schedule('20 4 * * *') // every 04:20 AM
  .onRun(async () => {
    const competition = { id: 2002, collectionId: 'Bundesliga' }
    await setMatches(competition)
    return null
  })
