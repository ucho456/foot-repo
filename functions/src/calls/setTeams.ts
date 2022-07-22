/** check */
// season=2021にしている。
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import axios, { AxiosResponse } from 'axios'
import { teamConverter } from '../converters'
import { competitionMap, config, convertPosition, env, footballUrl } from '../utils'

const getFbTeams = async (competitionId: number): Promise<FbTeam[]> => {
  const res: AxiosResponse<any, any> = await axios.get(
    footballUrl + `competitions/${competitionId}/teams?season=2021`,
    config
  )
  const fbTeams = res.data.teams as FbTeam[]
  return fbTeams
}

const getTeam = (fbTeam: FbTeam): Team => {
  return {
    id: String(fbTeam.id),
    name: fbTeam.name,
    imageUrl: fbTeam.crest,
    venue: fbTeam.venue,
    website: fbTeam.website,
    competitions: fbTeam.runningCompetitions.map((c) => {
      return { name: c.name, imageUrl: c.emblem }
    }),
    squad: fbTeam.squad.map((s, i) => {
      return {
        keyId: String(i),
        player: {
          id: String(s.id),
          name: s.name
        },
        position: convertPosition(s.position),
        dateOfBirth: s.dateOfBirth,
        nationality: s.nationality,
        shirtNumber: s.shirtNumber
      }
    }),
    lastUpdated: fbTeam.lastUpdated
  }
}

const setTeams = async (
  competition: { id: number; collectionId: string },
  req: functions.https.Request
): Promise<void> => {
  if (process.env.NODE_ENV === 'production' && req.body.secret !== env.secret) {
    throw new Error('Unauthorized')
  }
  const fbTeams = await getFbTeams(competition.id)
  const batch = admin.firestore().batch()
  for (const fbTeam of fbTeams) {
    const team = await getTeam(fbTeam)
    const tRef = admin.firestore().doc(`teams/${team.id}`).withConverter(teamConverter)
    const tSnapshot = await tRef.get()
    if (tSnapshot.exists) {
      const lastUpdated = tSnapshot.data()?.lastUpdated
      if (team.lastUpdated !== lastUpdated) batch.set(tRef, team)
    } else {
      batch.set(tRef, team)
    }
  }
  await batch.commit()
}

export const setBundesligaTeams = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    const competition = competitionMap.get('Bundesliga')!
    await setTeams(competition, req)
    res.sendStatus(200)
  })

export const setChampionsLeagueTeams = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    const competition = competitionMap.get('Champions-League')!
    await setTeams(competition, req)
    res.sendStatus(200)
  })

export const setJLeagueTeams = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    const competition = competitionMap.get('J-League')!
    await setTeams(competition, req)
    res.sendStatus(200)
  })

export const setLaLigaTeams = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    const competition = competitionMap.get('La-Liga')!
    await setTeams(competition, req)
    res.sendStatus(200)
  })

export const setLigue1Teams = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    const competition = competitionMap.get('Ligue-1')!
    await setTeams(competition, req)
    res.sendStatus(200)
  })

export const setPremierLeagueTeams = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    const competition = competitionMap.get('Premier-League')!
    await setTeams(competition, req)
    res.sendStatus(200)
  })

export const setSerieATeams = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    const competition = competitionMap.get('Serie-A')!
    await setTeams(competition, req)
    res.sendStatus(200)
  })

export const setWorldCupTeams = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    const competition = competitionMap.get('World-Cup')!
    await setTeams(competition, req)
    res.sendStatus(200)
  })
