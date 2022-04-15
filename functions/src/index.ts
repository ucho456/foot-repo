import * as admin from 'firebase-admin'
import createAuth from './calls/createAuth'
import createUser from './calls/createUser'
// import createMatches from './crons/createMatches'

admin.initializeApp()

module.exports = {
  createAuth,
  createUser
  // createMatches
}
