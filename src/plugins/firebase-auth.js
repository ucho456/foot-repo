import { defineNuxtPlugin, onGlobalSetup, onUnmounted, provide, ref } from '@nuxtjs/composition-api'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { LoginUserKey } from '@/utils/useLoginUser'
import { fetchUser } from '@/db/users'

export default defineNuxtPlugin((_, inject) => {
  const loginUser = ref(null)

  inject('loginUser', loginUser)

  let unsubscribe
  if (process.client) {
    const auth = getAuth()
    unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const user = await fetchUser(authUser.uid)
        loginUser.value = user
          ? {
              uid: user.id,
              name: user.name,
              imageUrl: user.imageUrl,
              competitionId: user.competitionId,
              team: user.team,
              greet: user.greet
            }
          : null
      } else {
        loginUser.value = null
      }
    })
  }

  onGlobalSetup(() => {
    provide(LoginUserKey, loginUser)
    onUnmounted(unsubscribe)
  })
})
