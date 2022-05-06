import * as functions from 'firebase-functions'
import { AxiosRequestConfig } from 'axios'

export const env = functions.config()['foot-repo']

export const footballUrl = env.football_url

export const config: AxiosRequestConfig<any> = { headers: { 'X-Auth-Token': env.football_token } }

export const leagueCompetitions = [
  { id: 2119, collectionId: 'J-League', name: 'J. League' },
  { id: 2021, collectionId: 'Premier-League', name: 'Premier League' },
  { id: 2014, collectionId: 'La-Liga', name: 'La Liga' },
  { id: 2019, collectionId: 'Serie-A', name: 'Serie A' },
  { id: 2002, collectionId: 'Bundesliga', name: 'Bundesliga' }
]

export const convertJST = (utcDate: string): Date => {
  const time = new Date(utcDate)
  time.setHours(time.getHours() + 9)
  return new Date(time)
}

export const convertPosition = (position: FbPosition): 'GK' | 'DF' | 'MF' | 'FW' => {
  return position === 'Goalkeeper'
    ? 'GK'
    : position === 'Defence'
    ? 'DF'
    : position === 'Midfield'
    ? 'MF'
    : 'FW'
}
