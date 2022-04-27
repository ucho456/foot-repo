import * as functions from 'firebase-functions'
import { AxiosRequestConfig } from 'axios'

export const env = functions.config()['foot-repo']

export const footballUrl = env.football_url

export const config: AxiosRequestConfig<any> = { headers: { 'X-Auth-Token': env.football_token } }

export const convertJST = (utcDate: string) => {
  const time = new Date(utcDate)
  time.setHours(time.getHours() + 9)
  return time.toLocaleString('ja-JP').slice(0, -3)
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
