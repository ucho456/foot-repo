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
      name: string
      competitionId: string
      standings: Standings | null
      scorers: Scorers | null
      matchSchedule: Match[]
      season: string
      yearMonth: string
    }
    team: {
      data: Team | null
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
      name: '',
      competitionId: '',
      standings: null,
      scorers: null,
      matchSchedule: [],
      season: '',
      yearMonth: ''
    },
    team: {
      data: null
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
      name: '',
      competitionId: '',
      standings: null,
      scorers: null,
      matchSchedule: [],
      season: '',
      yearMonth: ''
    }
    store.team = {
      data: null
    }
  }

  onGlobalSetup(() => {
    provide(StoreKey, store)
    onUnmounted(unsubscribe)
  })
})
