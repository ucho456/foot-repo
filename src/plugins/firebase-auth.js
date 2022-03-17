import { defineNuxtPlugin, onGlobalSetup, onUnmounted, ref, provide } from '@nuxtjs/composition-api'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { CurrentUser } from '@/utils/useCurrentUser'

export default defineNuxtPlugin(async (_, inject) => {
  const currentUser = ref(null)

  inject('currentUser', currentUser)

  const unsubscribe = await new Promise((resolve) => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // 多分ここでuidを使用してpublicProfileを取得するとログインユーザーをどこでも使いやすくなる筈。
      currentUser.value = user
        ? { uid: user.uid, name: user.displayName, photoUrl: user.photoURL, aaa: '' }
        : null
      resolve(unsubscribe)
    })
  })

  onGlobalSetup(() => {
    provide(CurrentUser, currentUser)
    onUnmounted(unsubscribe)
  })
})
