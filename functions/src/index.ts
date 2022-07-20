/** check */
/** 8/1にJLeague以外復活予定 */
import * as admin from 'firebase-admin'
import buildSitemap from './calls/buildSitemap'
import createAuth from './calls/createAuth'
import {
  createBundesligaMatches,
  // createJLeagueMatches,
  createLaLigaMatches,
  createLigue1Matches,
  createPremierLeagueMatches,
  createSerieAMatches
} from './calls/createMatches'
import createUser from './calls/createUser'
import { promptUpdateMatch } from './calls/promptUpdateMatch'
import {
  setBundesligaTeams,
  setJLeagueTeams,
  setLaLigaTeams,
  setLigue1Teams,
  setPremierLeagueTeams,
  setSerieATeams
} from './calls/setTeams'
import updateEmailVerified from './calls/updateEmailVerified'
// import {
// setBundesligaMatches,
// setJLeagueMatches,
// setLaLigaMatches,
// setLigue1Matches,
// setPremierLeagueMatches,
// setSerieAMatches
// } from './crons/setMatches'
// import setScorers from './crons/setScorers'
// import setStandings from './crons/setStandings'

admin.initializeApp()

module.exports = {
  buildSitemap,
  createAuth,
  createBundesligaMatches,
  // createJLeagueMatches,
  createLaLigaMatches,
  createLigue1Matches,
  createPremierLeagueMatches,
  createSerieAMatches,
  createUser,
  promptUpdateMatch,
  // setBundesligaMatches,
  setBundesligaTeams,
  // setJLeagueMatches,
  setJLeagueTeams,
  // setLaLigaMatches,
  setLaLigaTeams,
  // setLigue1Matches,
  setLigue1Teams,
  // setPremierLeagueMatches,
  setPremierLeagueTeams,
  // setScorers,
  // setSerieAMatches,
  setSerieATeams,
  // setStandings,
  updateEmailVerified
}
