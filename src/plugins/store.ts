import {
  defineNuxtPlugin,
  onGlobalSetup,
  onUnmounted,
  reactive,
  provide
} from '@nuxtjs/composition-api'
import type { QueryDocumentSnapshot } from 'firebase/firestore'
import { StoreKey } from '@/utils/useStore'

export default defineNuxtPlugin((_, inject) => {
  const store: {
    matches: {
      data: Match[]
      lastVisible: QueryDocumentSnapshot<Match> | null
      searchOption: SearchOption
    }
  } = reactive({
    matches: {
      data: [],
      lastVisible: null,
      searchOption: {
        status: '',
        competitionId: '',
        teamId: '',
        jstDate: ''
      }
    }
  })

  inject('store', store)

  const unsubscribe = () => {
    store.matches.data = []
    store.matches.lastVisible = null
    store.matches.searchOption = {
      status: '',
      competitionId: '',
      teamId: '',
      jstDate: ''
    }
  }

  onGlobalSetup(() => {
    provide(StoreKey, store)
    onUnmounted(unsubscribe)
  })
})
