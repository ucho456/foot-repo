import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import axios, { AxiosResponse } from 'axios'
import { matchConverter } from '../converters'
import {
  config,
  convertJST,
  convertYearMonth,
  env,
  footballUrl,
  leagueCompetitions
} from '../utils'

type Competition = { id: number; collectionId: string; name: string }

const getFbMatches = async (competitionId: number): Promise<FbMatch[]> => {
  const res: AxiosResponse<any, any> = await axios.get(
    footballUrl + `competitions/${competitionId}/matches?matchday=38&season=2021`,
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
    yearMonth: convertYearMonth(fbMatch.utcDate),
    matchday: fbMatch.matchday,
    status: fbMatch.status,
    venue: fbMatch.venue,
    teamIds: [String(fbMatch.homeTeam.id), String(fbMatch.awayTeam.id)],
    competition: {
      id: competition.collectionId,
      ref: admin.firestore().doc(`competitions/${competition.collectionId}`),
      name: competition.name,
      imageUrl: fbMatch.competition.emblem
    },
    homeTeam: {
      id: String(fbMatch.homeTeam.id),
      ref: admin.firestore().doc(`teams/${fbMatch.homeTeam.id}`),
      name: fbMatch.homeTeam.name,
      shortName: fbMatch.homeTeam.tla,
      imageUrl: fbMatch.homeTeam.crest,
      score: fbMatch.score.fullTime.home,
      penalty: fbMatch.score.penalties ? fbMatch.score.penalties.home : null
    },
    awayTeam: {
      id: String(fbMatch.awayTeam.id),
      ref: admin.firestore().doc(`teams/${fbMatch.awayTeam.id}`),
      name: fbMatch.awayTeam.name,
      shortName: fbMatch.awayTeam.tla,
      imageUrl: fbMatch.awayTeam.crest,
      score: fbMatch.score.fullTime.away,
      penalty: fbMatch.score.penalties ? fbMatch.score.penalties.away : null
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
  .https.onRequest(async (req) => {
    await setMatches(leagueCompetitions[0], req)
  })

export const createPremierLeagueMatches = functions
  .region('asia-northeast1')
  .https.onRequest(async (req) => {
    await setMatches(leagueCompetitions[1], req)
  })

export const createLaLigaMatches = functions
  .region('asia-northeast1')
  .https.onRequest(async (req) => {
    await setMatches(leagueCompetitions[2], req)
  })

export const createSerieAMatches = functions
  .region('asia-northeast1')
  .https.onRequest(async (req) => {
    await setMatches(leagueCompetitions[3], req)
  })

export const createBundesligaMatches = functions
  .region('asia-northeast1')
  .https.onRequest(async (req) => {
    await setMatches(leagueCompetitions[4], req)
  })
