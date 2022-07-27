/** check */
/** 8/1にJLeague以外復活予定 */
import * as admin from 'firebase-admin'
import buildSitemap from './calls/buildSitemap'
import createAuth from './calls/createAuth'
import createJapanMatch from './calls/createJapanMatch'
import createMatches from './calls/createMatches'
import createUser from './calls/createUser'
import fetchSSR from './calls/fetchSSR'
import promptUpdateMatch from './calls/promptUpdateMatch'
import setTeams from './calls/setTeams'
import updateEmailVerified from './calls/updateEmailVerified'
// import {
//   setBundesligaMatches,
//   setChampionsLeagueMatches,
//   setJLeagueMatches,
//   setLaLigaMatches,
//   setLigue1Matches,
//   setPremierLeagueMatches,
//   setSerieAMatches,
//   setWorldCupMatches
// } from './crons/setMatches'
// import setScorers from './crons/setScorers'
// import setStandings from './crons/setStandings'

admin.initializeApp()

module.exports = {
  buildSitemap,
  createAuth,
  createJapanMatch,
  createMatches,
  createUser,
  fetchSSR,
  promptUpdateMatch,
  // setBundesligaMatches,
  // setChampionsLeagueMatches,
  // setJLeagueMatches,
  // setLaLigaMatches,
  // setLigue1Matches,
  // setPremierLeagueMatches,
  // setScorers,
  // setSerieAMatches,
  // setStandings,
  setTeams,
  // setWorldCupMatches,
  updateEmailVerified
}
