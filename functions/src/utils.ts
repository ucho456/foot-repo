/** check */
import * as functions from 'firebase-functions'
import { AxiosRequestConfig } from 'axios'

export const env = functions.config()['foot-repo']

export const config: AxiosRequestConfig<any> = { headers: { 'X-Auth-Token': env.football_token } }

export const footballUrl = env.football_url

export const leagueCompetitions = [
  { id: 2119, collectionId: 'J-League', name: 'J. League' },
  { id: 2021, collectionId: 'Premier-League', name: 'Premier League' },
  { id: 2014, collectionId: 'La-Liga', name: 'La Liga' },
  { id: 2019, collectionId: 'Serie-A', name: 'Serie A' },
  { id: 2002, collectionId: 'Bundesliga', name: 'Bundesliga' }
]

export const convertJST = (utcDate: string): string => {
  functions.logger.log('あああ utcDate', utcDate)
  const time = new Date(utcDate)
  time.setHours(time.getHours() + 9)
  functions.logger.log('いいい time', time)
  functions.logger.log(
    'ううう jstDate',
    `${time.getFullYear()}-${String(time.getMonth() + 1).padStart(2, '0')}-${String(
      time.getDate() + 1
    ).padStart(2, '0')}`
  )
  return `${time.getFullYear()}-${String(time.getMonth() + 1).padStart(2, '0')}-${String(
    time.getDate() + 1
  ).padStart(2, '0')}`
}

export const convertPosition = (position: FbPosition): 'GK' | 'DF' | 'MF' | 'FW' | null => {
  return position === 'Goalkeeper'
    ? 'GK'
    : position === 'Defence' || position?.includes('Back')
    ? 'DF'
    : position?.includes('Midfield')
    ? 'MF'
    : position === 'Attacker' ||
      position === 'Offence' ||
      position?.includes('Forward') ||
      position?.includes('Winger')
    ? 'FW'
    : null
}

export const convertYearMonth = (utcDate: string): string => {
  const time = new Date(utcDate)
  time.setHours(time.getHours() + 9)
  return `${time.getFullYear()}-${String(time.getMonth() + 1).padStart(2, '0')}`
}
