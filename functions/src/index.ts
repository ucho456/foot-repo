import * as admin from 'firebase-admin'
import createAuth from './calls/createAuth'
import createUser from './calls/createUser'
import {
  createJLeagueMatches,
  createPremierLeagueMatches,
  createLaLigaMatches,
  createSerieAMatches,
  createBundesligaMatches
} from './calls/createMatches'
import setMatches from './crons/setMatches'
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
  createUser,
  createJLeagueMatches,
  createPremierLeagueMatches,
  createLaLigaMatches,
  createSerieAMatches,
  createBundesligaMatches,
  setMatches,
  setScorers,
  setStandings,
  setJLeagueTeams,
  setPremierLeagueTeams,
  setLaLigaTeams,
  setSerieATeams,
  setBundesligaTeams
}
