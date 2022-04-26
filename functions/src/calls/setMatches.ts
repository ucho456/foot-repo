import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import axios, { AxiosResponse } from 'axios'
import { Match } from '../@types/matches'
import { matchConverter } from '../converters'
import { convertJST, env, footballUrl, config } from '../utils'

const getFbMatches = async (competitionId: number): Promise<FbMatch[]> => {
  const res: AxiosResponse<any, any> = await axios.get(
    footballUrl + `competitions/${competitionId}/matches`,
    config
  )
  const fbMatches = res.data.matches as FbMatch[]
  return fbMatches
}

const makeMatch = (fbMatch: FbMatch): Match => {
  return {
    id: fbMatch.id,
    season: fbMatch.season.startDate.substring(0, 4),
    jstDate: convertJST(fbMatch.utcDate),
    matchday: fbMatch.matchday,
    status: fbMatch.status,
    teamIds: [fbMatch.homeTeam.id, fbMatch.awayTeam.id],
    homeTeam: {
      ref: admin.firestore().doc(`teams/${fbMatch.homeTeam.id}`),
      id: fbMatch.homeTeam.id,
      name: fbMatch.homeTeam.name,
      score: fbMatch.score.fullTime.homeTeam,
      penalty: fbMatch.score.penalties.homeTeam,
      goalPlayers: fbMatch.goals.flatMap((g) => {
        if (g.team.id !== fbMatch.homeTeam.id) return []
        return { minute: g.minute, name: g.scorer.name }
      })
    },
    awayTeam: {
      ref: admin.firestore().doc(`teams/${fbMatch.awayTeam.id}`),
      id: fbMatch.awayTeam.id,
      name: fbMatch.awayTeam.name,
      score: fbMatch.score.fullTime.awayTeam,
      penalty: fbMatch.score.penalties.awayTeam,
      goalPlayers: fbMatch.goals.flatMap((g) => {
        if (g.team.id !== fbMatch.awayTeam.id) return []
        return { minute: g.minute, name: g.scorer.name }
      })
    },
    lastUpdated: fbMatch.lastUpdated
  }
}

const setMatches = async (
  competition: { id: number; collectionId: string },
  req: functions.https.Request
): Promise<void> => {
  if (req.body.secret !== env.secret) throw new Error('Unauthorized')
  const fbMatches = await getFbMatches(competition.id)
  const batch = admin.firestore().batch()
  for (const fbMatch of fbMatches) {
    const mRef = admin.firestore().doc(`matches/${fbMatch.id}`).withConverter(matchConverter)
    const mSnapshot = await mRef.get()
    if (mSnapshot.exists) {
      const lastUpdated = mSnapshot.data()?.lastUpdated
      if (fbMatch.lastUpdated !== lastUpdated) {
        const match = makeMatch(fbMatch)
        batch.set(mRef, match)
      }
    } else {
      const match = makeMatch(fbMatch)
      batch.set(mRef, match)
    }
  }
  await batch.commit()
}

export const setJLeagueMatches = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    const competition = { id: 2119, collectionId: 'J-League' }
    await setMatches(competition, req)
    res.send(`success setJLeagueMatches ${new Date()}`)
  })

export const setPremierLeagueMatches = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    const competition = { id: 2021, collectionId: 'Premier-League' }
    await setMatches(competition, req)
    res.send(`success setPremierLeagueMatches ${new Date()}`)
  })

export const setLaLigaMatches = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    const competition = { id: 2014, collectionId: 'La-Liga' }
    await setMatches(competition, req)
    res.send(`success setLaLigaMatches ${new Date()}`)
  })

export const setSerieAMatches = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    const competition = { id: 2019, collectionId: 'Seria-A' }
    await setMatches(competition, req)
    res.send(`success setSerieAMatches ${new Date()}`)
  })

export const setBundesligaMatches = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    const competition = { id: 2002, collectionId: 'Bundesliga' }
    await setMatches(competition, req)
    res.send(`success setBundesligaMatches ${new Date()}`)
  })
