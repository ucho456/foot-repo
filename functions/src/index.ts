/** check */
/** 8/1にJLeague以外復活予定 */
import * as admin from 'firebase-admin'
import buildSitemap from './calls/buildSitemap'
import createAuth from './calls/createAuth'
import { createJapanMatch } from './calls/createJapanMatch'
import {
  createBundesligaMatches,
  createChampionsLeagueMatches,
  createJLeagueMatches,
  createLaLigaMatches,
  createLigue1Matches,
  createPremierLeagueMatches,
  createSerieAMatches,
  createWorldCupMatches
} from './calls/createMatches'
import createUser from './calls/createUser'
import { promptUpdateMatch } from './calls/promptUpdateMatch'
import {
  setBundesligaTeams,
  setChampionsLeagueTeams,
  setJLeagueTeams,
  setLaLigaTeams,
  setLigue1Teams,
  setPremierLeagueTeams,
  setSerieATeams,
  setWorldCupTeams
} from './calls/setTeams'
import updateEmailVerified from './calls/updateEmailVerified'
import {
  setBundesligaMatches,
  setChampionsLeagueMatches,
  setJLeagueMatches,
  setLaLigaMatches,
  setLigue1Matches,
  setPremierLeagueMatches,
  setSerieAMatches,
  setWorldCupMatches
} from './crons/setMatches'
import setScorers from './crons/setScorers'
import setStandings from './crons/setStandings'

admin.initializeApp()

module.exports = {
  buildSitemap,
  createAuth,
  createBundesligaMatches,
  createChampionsLeagueMatches,
  createJLeagueMatches,
  createJapanMatch,
  createLaLigaMatches,
  createLigue1Matches,
  createPremierLeagueMatches,
  createSerieAMatches,
  createUser,
  createWorldCupMatches,
  promptUpdateMatch,
  setBundesligaMatches,
  setBundesligaTeams,
  setChampionsLeagueMatches,
  setChampionsLeagueTeams,
  setJLeagueMatches,
  setJLeagueTeams,
  setLaLigaMatches,
  setLaLigaTeams,
  setLigue1Matches,
  setLigue1Teams,
  setPremierLeagueMatches,
  setPremierLeagueTeams,
  setScorers,
  setSerieAMatches,
  setSerieATeams,
  setStandings,
  setWorldCupMatches,
  setWorldCupTeams,
  updateEmailVerified
}
