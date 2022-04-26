import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import axios, { AxiosResponse } from 'axios'
import { teamConverter } from '../converters'
import { footballUrl, config } from '../utils'

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
  const squad = fbTeam.squad.map((s) => {
    const position: 'GK' | 'DF' | 'MF' | 'FW' =
      s.position === 'Goalkeeper'
        ? 'GK'
        : s.position === 'Defence'
        ? 'DF'
        : s.position === 'Midfield'
        ? 'MF'
        : 'FW'
    return {
      playerName: s.name,
      position,
      dateOfBirth: s.dateOfBirth,
      nationality: s.nationality
    }
  })
  return {
    id: fbTeam.id,
    name: fbTeam.name,
    imageUrl: fbTeam.crestUrl,
    venue: fbTeam.venue,
    website: fbTeam.website,
    squad,
    lastUpdated: fbTeam.lastUpdated
  }
}

const setTeams = async (competition: { id: number; collectionId: string }): Promise<void> => {
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

export const setJLeagueTeams = functions
  .region('asia-northeast1')
  .pubsub.schedule('0 4 * * *') // every 04:00 AM
  .onRun(async () => {
    const competition = { id: 2119, collectionId: 'J-League' }
    await setTeams(competition)
    return null
  })

export const setPremierLeagueTeams = functions
  .region('asia-northeast1')
  .pubsub.schedule('5 4 * * *') // every 04:05 AM
  .onRun(async () => {
    const competition = { id: 2021, collectionId: 'Premier-League' }
    await setTeams(competition)
    return null
  })

export const setLaLigaTeams = functions
  .region('asia-northeast1')
  .pubsub.schedule('10 4 * * *') // every 04:10 AM
  .onRun(async () => {
    const competition = { id: 2014, collectionId: 'La-Liga' }
    await setTeams(competition)
    return null
  })

export const setSerieATeams = functions
  .region('asia-northeast1')
  .pubsub.schedule('15 4 * * *') // every 04:15 AM
  .onRun(async () => {
    const competition = { id: 2019, collectionId: 'Seria-A' }
    await setTeams(competition)
    return null
  })

export const setBundesligaTeams = functions
  .region('asia-northeast1')
  .pubsub.schedule('20 4 * * *') // every 04:20 AM
  .onRun(async () => {
    const competition = { id: 2002, collectionId: 'Bundesliga' }
    await setTeams(competition)
    return null
  })
