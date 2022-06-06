import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { getApp, getApps, initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectStorageEmulator, getStorage } from 'firebase/storage'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'
import { getAnalytics, logEvent } from 'firebase/analytics'

export default defineNuxtPlugin(() => {
  if (getApps().length !== 0) return
  const config = {
    apiKey: 'AIzaSyCiH-SePvxwZVAKGkK0sbqbD5ZOXtAH5xw',
    authDomain: 'foot-repo.firebaseapp.com',
    projectId: 'foot-repo',
    storageBucket: 'foot-repo.appspot.com',
    messagingSenderId: '289946075434',
    appId: '1:289946075434:web:ce3f88ded80f04a613de53',
    measurementId: 'G-FFB7N3Q6LY'
  }
  initializeApp(config)

  if (process.env.NODE_ENV === 'development') {
    const auth = getAuth()
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
    const db = getFirestore()
    connectFirestoreEmulator(db, 'localhost', 8083)
    const storage = getStorage()
    connectStorageEmulator(storage, 'localhost', 9199)
    const functions = getFunctions(getApp())
    connectFunctionsEmulator(functions, 'localhost', 5001)
  } else if (process.env.NODE_ENV === 'production') {
    const analytics = getAnalytics()
    logEvent(analytics, 'notification_received')
  }
})
