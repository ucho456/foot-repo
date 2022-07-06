import * as admin from 'firebase-admin'
import createAuth from './calls/createAuth'
import {
  createBundesligaMatches,
  createJLeagueMatches,
  createLaLigaMatches,
  createPremierLeagueMatches,
  createSerieAMatches
} from './calls/createMatches'
import createUser from './calls/createUser'
import updateEmailVerified from './calls/updateEmailVerified'
// import {
//   setBundesligaMatches,
//   setJLeagueMatches,
//   setLaLigaMatches,
//   setPremierLeagueMatches,
//   setSerieAMatches
// } from './crons/setMatches'
// import setScorers from './crons/setScorers'
// import setStandings from './crons/setStandings'
// import {
//   setBundesligaTeams,
//   setJLeagueTeams,
//   setLaLigaTeams,
//   setPremierLeagueTeams,
//   setSerieATeams
// } from './crons/setTeams'

admin.initializeApp()

module.exports = {
  createAuth,
  createBundesligaMatches,
  createJLeagueMatches,
  createLaLigaMatches,
  createPremierLeagueMatches,
  createSerieAMatches,
  createUser,
  // setBundesligaMatches,
  // setBundesligaTeams,
  // setJLeagueMatches,
  // setJLeagueTeams,
  // setLaLigaMatches,
  // setLaLigaTeams,
  // setPremierLeagueMatches,
  // setPremierLeagueTeams,
  // setScorers,
  // setSerieAMatches,
  // setSerieATeams,
  // setStandings,
  updateEmailVerified
}
