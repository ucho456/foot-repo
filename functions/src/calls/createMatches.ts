import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import axios, { AxiosResponse } from 'axios'
import { Match } from '../@types/matches'
import { matchConverter } from '../converters'
import { config, convertJST, env, footballUrl } from '../utils'

type Competition = { id: number; collectionId: string; name: string }

const getFbMatches = async (competitionId: number): Promise<FbMatch[]> => {
  const res: AxiosResponse<any, any> = await axios.get(
    footballUrl + `competitions/${competitionId}/matches`,
    config
  )
  const fbMatches = res.data.matches as FbMatch[]
  return fbMatches
}

export const makeMatch = (fbMatch: FbMatch, competition: Competition): Match => {
  return {
    id: String(fbMatch.id),
    season: fbMatch.season.startDate.substring(0, 4),
    jstDate: convertJST(fbMatch.utcDate),
    matchday: fbMatch.matchday,
    status: fbMatch.status,
    teamIds: [String(fbMatch.homeTeam.id), String(fbMatch.awayTeam.id)],
    competition: {
      id: String(competition.id),
      ref: admin.firestore().doc(`competitions/${competition.collectionId}`),
      name: competition.name
    },
    homeTeam: {
      id: String(fbMatch.homeTeam.id),
      ref: admin.firestore().doc(`teams/${fbMatch.homeTeam.id}`),
      name: fbMatch.homeTeam.name,
      score: fbMatch.score.fullTime.homeTeam,
      penalty: fbMatch.score.penalties.homeTeam,
      goalPlayers: fbMatch.goals.flatMap((g) => {
        if (g.team.id !== fbMatch.homeTeam.id) return []
        return { minute: g.minute, name: g.scorer.name }
      })
    },
    awayTeam: {
      id: String(fbMatch.awayTeam.id),
      ref: admin.firestore().doc(`teams/${fbMatch.awayTeam.id}`),
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
  competition: Competition,
  req: functions.https.Request
): Promise<void> => {
  if (process.env.NODE_ENV === 'production' && req.body.secret !== env.secret) {
    throw new Error('Unauthorized')
  }
  const fbMatches = await getFbMatches(competition.id)
  const batch = admin.firestore().batch()
  for (const fbMatch of fbMatches) {
    const mRef = admin.firestore().doc(`matches/${fbMatch.id}`).withConverter(matchConverter)
    const mSnapshot = await mRef.get()
    if (mSnapshot.exists) {
      if (fbMatch.lastUpdated !== mSnapshot.data()?.lastUpdated) {
        const match = makeMatch(fbMatch, competition)
        batch.set(mRef, match)
      }
    } else {
      const match = makeMatch(fbMatch, competition)
      batch.set(mRef, match)
    }
  }
  await batch.commit()
}

export const createJLeagueMatches = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    try {
      const competition = { id: 2119, collectionId: 'J-League', name: 'J. League' }
      await setMatches(competition, req)
      res.send(`success createJLeagueMatches ${new Date()}`)
    } catch {
      res.send(`error createJLeagueMatches ${new Date()}`)
    }
  })

export const createPremierLeagueMatches = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    try {
      const competition = { id: 2021, collectionId: 'Premier-League', name: 'Premier League' }
      await setMatches(competition, req)
      res.send(`success createPremierLeagueMatches ${new Date()}`)
    } catch {
      res.send(`error createPremierLeagueMatches ${new Date()}`)
    }
  })

export const createLaLigaMatches = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    try {
      const competition = { id: 2014, collectionId: 'La-Liga', name: 'La Liga' }
      await setMatches(competition, req)
      res.send(`success createLaLigaMatches ${new Date()}`)
    } catch {
      res.send(`error createLaLigaMatches ${new Date()}`)
    }
  })

export const createSerieAMatches = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    try {
      const competition = { id: 2019, collectionId: 'Serie-A', name: 'Seria A' }
      await setMatches(competition, req)
      res.send(`success createSerieAMatches ${new Date()}`)
    } catch {
      res.send(`error createSerieAMatches ${new Date()}`)
    }
  })

export const createBundesligaMatches = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    try {
      const competition = { id: 2002, collectionId: 'Bundesliga', name: 'Bundesliga' }
      await setMatches(competition, req)
      res.send(`success createBundesligaMatches ${new Date()}`)
    } catch {
      res.send(`error createBundesligaMatches ${new Date()}`)
    }
  })
