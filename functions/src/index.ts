import * as admin from 'firebase-admin'
import createAuth from './calls/createAuth'
import createUser from './calls/createUser'
import {
  setJLeagueMatches,
  setPremierLeagueMatches,
  setLaLigaMatches,
  setSerieAMatches,
  setBundesligaMatches
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
  setJLeagueMatches,
  setPremierLeagueMatches,
  setLaLigaMatches,
  setSerieAMatches,
  setBundesligaMatches,
  setMatches,
  setScorers,
  setStandings,
  setJLeagueTeams,
  setPremierLeagueTeams,
  setLaLigaTeams,
  setSerieATeams,
  setBundesligaTeams
}
