import { defineNuxtPlugin, onGlobalSetup, onUnmounted, ref, provide } from '@nuxtjs/composition-api'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'
import db from '@/plugins/firebase'
import { CurrentUser } from '@/utils/useCurrentUser'

export default defineNuxtPlugin(async (_, inject) => {
  const currentUser = ref(null)

  inject('currentUser', currentUser)

  const unsubscribe = await new Promise((resolve) => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        getDoc(doc(db, 'users', authUser.uid))
          .then((uSnapshot) => {
            if (uSnapshot.exists()) {
              const user = uSnapshot.data()
              currentUser.value = {
                uid: authUser.uid,
                name: user.name,
                photoUrl: user.photoUrl
              }
            }
          })
          .catch(() => {
            currentUser.value = null
          })
      } else {
        currentUser.value = null
      }
      resolve(unsubscribe)
    })
  })

  onGlobalSetup(() => {
    provide(CurrentUser, currentUser)
    onUnmounted(unsubscribe)
  })
})
