import { defineNuxtPlugin, onGlobalSetup, onUnmounted, provide, ref } from '@nuxtjs/composition-api'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { LoginUserKey } from '@/utils/useLoginUser'
import { fetchUserPriorityFromCashe } from '@/db/users'

export default defineNuxtPlugin((_, inject) => {
  const loginUser = ref(null)

  inject('loginUser', loginUser)

  const auth = getAuth()
  const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
    if (authUser) {
      const p0 = performance.now()
      const user = await fetchUserPriorityFromCashe(authUser.uid)
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
      const p1 = performance.now()
      console.log('performance', p1 - p0)
    } else {
      loginUser.value = null
    }
  })

  onGlobalSetup(() => {
    provide(LoginUserKey, loginUser)
    onUnmounted(unsubscribe)
  })
})
