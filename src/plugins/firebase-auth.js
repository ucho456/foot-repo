import { defineNuxtPlugin, onGlobalSetup, onUnmounted, provide, ref } from '@nuxtjs/composition-api'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { CurrentUserKey } from '@/utils/useCurrentUser'
import { fetchUser } from '@/db/users'

export default defineNuxtPlugin(async (_, inject) => {
  const currentUser = ref(null)

  inject('currentUser', currentUser)

  const unsubscribe = await new Promise((resolve) => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const user = await fetchUser(authUser.uid)
        const idTokenResult = await authUser.getIdTokenResult(true)
        currentUser.value =
          user && idTokenResult.claims.initSetting
            ? {
                uid: user.id,
                name: user.name,
                imageUrl: user.imageUrl,
                competitionId: user.competitionId,
                teamId: user.teamId,
                initSetting: idTokenResult.claims.initSetting,
                subscription: idTokenResult.claims.subscription,
                suspended: idTokenResult.claims.suspended
              }
            : null
      } else {
        currentUser.value = null
      }
      resolve(unsubscribe)
    })
  })

  onGlobalSetup(() => {
    provide(CurrentUserKey, currentUser)
    onUnmounted(unsubscribe)
  })
})
