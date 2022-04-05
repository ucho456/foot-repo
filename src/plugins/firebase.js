import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { initializeApp, getApps } from 'firebase/app'

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
})
