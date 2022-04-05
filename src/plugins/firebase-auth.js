import { defineNuxtPlugin, onGlobalSetup, onUnmounted, provide, ref } from '@nuxtjs/composition-api'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { CurrentUserKey } from '@/utils/useCurrentUser'

export default defineNuxtPlugin(async (_, inject) => {
  const currentUser = ref(null)

  inject('currentUser', currentUser)

  const unsubscribe = await new Promise((resolve) => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      currentUser.value = user
        ? { uid: user.uid, name: user.displayName, imageUrl: user.photoURL }
        : null
      resolve(unsubscribe)
    })
  })

  onGlobalSetup(() => {
    provide(CurrentUserKey, currentUser)
    onUnmounted(unsubscribe)
  })
})

// auth.currentUserとuserを統合する処理
// import { getDoc, doc } from 'firebase/firestore'
// import db from '@/plugins/firebase'
// const unsubscribe = await new Promise((resolve) => {
//   const auth = getAuth()
//   const unsubscribe = onAuthStateChanged(auth, (authUser) => {
//     if (authUser) {
//       getDoc(doc(db, 'users', authUser.uid))
//         .then((uSnapshot) => {
//           if (uSnapshot.exists()) {
//             const user = uSnapshot.data()
//             currentUser.value = {
//               uid: authUser.uid,
//               name: user.name,
//               photoUrl: user.photoUrl
//             }
//           }
//         })
//         .catch(() => {
//           currentUser.value = null
//         })
//     } else {
//       currentUser.value = null
//     }
//     resolve(unsubscribe)
//   })
// })

// nuxtでreloadする処理
// onMounted(() => {
//   if (window.name !== 'reloaded') {
//     window.name = 'reloaded'
//     window.location.reload(true)
//   } else {
//     window.name = ''
//   }
// })
