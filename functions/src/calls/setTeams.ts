import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import axios, { AxiosResponse } from 'axios'
import { teamConverter } from '../converters'
import { config, convertPosition, env, footballUrl, leagueCompetitions } from '../utils'

const getTeamIds = async (competitionId: number): Promise<number[]> => {
  const res: AxiosResponse<any, any> = await axios.get(
    footballUrl + `competitions/${competitionId}/teams`,
    config
  )
  const resData = res.data as { teams: { id: number }[] }
  const teamIds = resData.teams.map((t) => t.id)
  return teamIds
}

const getTeam = async (teamId: number): Promise<Team> => {
  const res: AxiosResponse<any, any> = await axios.get(footballUrl + `teams/${teamId}`, config)
  const fbTeam = res.data as FbTeam
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
  const teamIds = await getTeamIds(competition.id)
  const batch = admin.firestore().batch()
  for (const teamId of teamIds) {
    const team = await getTeam(teamId)
    const tRef = admin.firestore().doc(`teams/${teamId}`).withConverter(teamConverter)
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
    await setTeams(leagueCompetitions[4], req)
    res.sendStatus(200)
  })

export const setJLeagueTeams = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    await setTeams(leagueCompetitions[0], req)
    res.sendStatus(200)
  })

export const setLaLigaTeams = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    await setTeams(leagueCompetitions[2], req)
    res.sendStatus(200)
  })

export const setPremierLeagueTeams = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    await setTeams(leagueCompetitions[1], req)
    res.sendStatus(200)
  })

export const setSerieATeams = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    await setTeams(leagueCompetitions[3], req)
    res.sendStatus(200)
  })
