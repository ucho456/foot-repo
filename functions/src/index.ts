import * as admin from 'firebase-admin'
import createAuth from './calls/createAuth'
import createUser from './calls/createUser'
import setScorers from './crons/setScorers'
import setStandings from './crons/setStandings'
import {
  setJLeagueTeams,
  setPremierLeagueTeams,
  setLaLigaTeams,
  setSerieATeams,
  setBundesligaTeams
} from './crons/setTeams'
// import createMatches from './crons/createMatches'

admin.initializeApp()

module.exports = {
  createAuth,
  createUser,
  setScorers,
  setStandings,
  setJLeagueTeams,
  setPremierLeagueTeams,
  setLaLigaTeams,
  setSerieATeams,
  setBundesligaTeams
  // createMatches
}
