import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot
} from 'firebase-admin/firestore'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

type Squad = {
  playerName: string
  position: 'GK' | 'DF' | 'MF' | 'FW'
  dateOfBirth: string
  nationality: string
}

type Team = {
  name: string
  imageUrl: string
  venue: string
  website: string
  squad: Squad[]
  lastUpdated: string
}

type ResData = {
  id: number
  name: string
  crestUrl: string
  website: string
  venue: string
  squad: {
    name: string
    position: 'Goalkeeper' | 'Defence' | 'Midfield' | 'Offence'
    dateOfBirth: string
    nationality: string
  }[]
  lastUpdated: string
}

const teamConverter: FirestoreDataConverter<Team> = {
  toFirestore(team: Team): DocumentData {
    return {
      name: team.name,
      imageUrl: team.imageUrl,
      venue: team.venue,
      website: team.website,
      squad: team.squad,
      lastUpdated: team.lastUpdated
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Team {
    const data = snapshot.data()
    return {
      name: data.name,
      imageUrl: data.imageUrl,
      venue: data.venue,
      website: data.website,
      squad: data.squad,
      lastUpdated: data.lastUpdated
    }
  }
}

const env = functions.config()['foot-repo']
const footballUrl = env.football_url
const config: AxiosRequestConfig<any> = { headers: { 'X-Auth-Token': env.football_token } }

const getTeamIds = async (fbCompetitionId: number): Promise<number[]> => {
  const res: AxiosResponse<any, any> = await axios.get(
    footballUrl + `competitions/${fbCompetitionId}/teams`,
    config
  )
  const resData = res.data as { teams: { id: number }[] }
  const teamIds = resData.teams.map((t) => t.id)
  return teamIds
}

const getTeam = async (teamId: number): Promise<Team> => {
  const res: AxiosResponse<any, any> = await axios.get(footballUrl + `teams/${teamId}`, config)
  const resData = res.data as ResData
  const name = resData.name
  const imageUrl = resData.crestUrl
  const venue = resData.venue
  const website = resData.website
  const squad = resData.squad.map((s) => {
    return {
      playerName: s.name,
      position:
        s.position === 'Goalkeeper'
          ? 'GK'
          : s.position === 'Defence'
          ? 'DF'
          : s.position === 'Midfield'
          ? 'MF'
          : 'FW',
      dateOfBirth: s.dateOfBirth,
      nationality: s.nationality
    }
  }) as Squad[]
  const lastUpdated = resData.lastUpdated
  return { name, imageUrl, venue, website, squad, lastUpdated }
}

const setTeam = async (competition: { id: number; collectionId: string }): Promise<void> => {
  try {
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
  } catch (error) {
    console.log(error)
  }
}

export const setJLeagueTeams = functions
  .region('asia-northeast1')
  .pubsub.schedule('0 4 * * *') // every 04:00 AM
  .onRun(async () => {
    const competition = { id: 2119, collectionId: 'J-League' }
    await setTeam(competition)
    return null
  })

export const setPremierLeagueTeams = functions
  .region('asia-northeast1')
  .pubsub.schedule('5 4 * * *') // every 04:05 AM
  .onRun(async () => {
    const competition = { id: 2021, collectionId: 'Premier-League' }
    await setTeam(competition)
    return null
  })

export const setLaLigaTeams = functions
  .region('asia-northeast1')
  .pubsub.schedule('10 4 * * *') // every 04:10 AM
  .onRun(async () => {
    const competition = { id: 2014, collectionId: 'La-Liga' }
    await setTeam(competition)
    return null
  })

export const setSerieATeams = functions
  .region('asia-northeast1')
  .pubsub.schedule('15 4 * * *') // every 04:15 AM
  .onRun(async () => {
    const competition = { id: 2019, collectionId: 'Seria-A' }
    await setTeam(competition)
    return null
  })

export const setBundesligaTeams = functions
  .region('asia-northeast1')
  .pubsub.schedule('20 4 * * *') // every 04:20 AM
  .onRun(async () => {
    const competition = { id: 2002, collectionId: 'Bundesliga' }
    await setTeam(competition)
    return null
  })
