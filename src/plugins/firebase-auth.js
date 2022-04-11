import { defineNuxtPlugin, onGlobalSetup, onUnmounted, provide, ref } from '@nuxtjs/composition-api'
import { CurrentUserKey } from '@/utils/useCurrentUser'

export default defineNuxtPlugin((_, inject) => {
  const currentUser = ref(null)

  inject('currentUser', currentUser)

  const unsubscribe = () => {
    currentUser.value = null
  }

  onGlobalSetup(() => {
    provide(CurrentUserKey, currentUser)
    onUnmounted(unsubscribe)
  })
})
