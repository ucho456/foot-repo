import * as admin from 'firebase-admin'
import createAuth from './calls/createAuth'
import {
  createJLeagueMatches,
  createPremierLeagueMatches,
  createLaLigaMatches,
  createSerieAMatches,
  createBundesligaMatches
} from './calls/createMatches'
import createUser from './calls/createUser'
import updateEmailVerified from './calls/updateEmailVerified'
import {
  setJLeagueMatches,
  setPremierLeagueMatches,
  setLaLigaMatches,
  setSerieAMatches,
  setBundesligaMatches
} from './crons/setMatches'
import setScorers from './crons/setScorers'
import setStandings from './crons/setStandings'
import {
  setJLeagueTeams,
  setPremierLeagueTeams,
  setLaLigaTeams,
  setSerieATeams,
  setBundesligaTeams
} from './crons/setTeams'

admin.initializeApp()

module.exports = {
  createAuth,
  createJLeagueMatches,
  createPremierLeagueMatches,
  createLaLigaMatches,
  createSerieAMatches,
  createBundesligaMatches,
  createUser,
  updateEmailVerified,
  setJLeagueMatches,
  setPremierLeagueMatches,
  setLaLigaMatches,
  setSerieAMatches,
  setBundesligaMatches,
  setScorers,
  setStandings,
  setJLeagueTeams,
  setPremierLeagueTeams,
  setLaLigaTeams,
  setSerieATeams,
  setBundesligaTeams
}
