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
    reports: {
      data: Report[]
      lastVisible: QueryDocumentSnapshot<Report> | null
      searchOption: SearchOption
    }
    league: {
      competitionId: string
      standings: Standings | null
      scorers: Scorers | null
      matches: Match[]
      season: string
      yearMonth: string
    }
  } = reactive({
    matches: {
      data: [],
      lastVisible: null,
      searchOption: { status: '', competitionId: '', teamId: '', jstDate: '' }
    },
    reports: {
      data: [],
      lastVisible: null,
      searchOption: { status: '', competitionId: '', teamId: '', jstDate: '' }
    },
    league: {
      competitionId: '',
      standings: null,
      scorers: null,
      matches: [],
      season: '',
      yearMonth: ''
    }
  })

  inject('store', store)

  const unsubscribe = () => {
    store.matches = {
      data: [],
      lastVisible: null,
      searchOption: { status: '', competitionId: '', teamId: '', jstDate: '' }
    }
    store.reports = {
      data: [],
      lastVisible: null,
      searchOption: { status: '', competitionId: '', teamId: '', jstDate: '' }
    }
    store.league = {
      competitionId: '',
      standings: null,
      scorers: null,
      matches: [],
      season: '',
      yearMonth: ''
    }
  }

  onGlobalSetup(() => {
    provide(StoreKey, store)
    onUnmounted(unsubscribe)
  })
})
