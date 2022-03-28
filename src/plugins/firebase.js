import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const config = {
  apiKey: 'AIzaSyCiH-SePvxwZVAKGkK0sbqbD5ZOXtAH5xw',
  authDomain: 'foot-repo.firebaseapp.com',
  projectId: 'foot-repo',
  storageBucket: 'foot-repo.appspot.com',
  messagingSenderId: '289946075434',
  appId: '1:289946075434:web:ce3f88ded80f04a613de53',
  measurementId: 'G-FFB7N3Q6LY'
}

const firebase = !getApps().length ? initializeApp(config) : getApp()
getStorage(firebase)
const db = getFirestore(firebase)

export default db
