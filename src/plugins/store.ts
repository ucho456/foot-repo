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
    confirmation: {
      isLogin: boolean
    }
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
    match: {
      data: Match | null
      detail: MatchDetail | null
      reports: Report[]
    }
    users: {
      data: User[]
      lastVisible: QueryDocumentSnapshot<User> | null
      searchOption: SearchOption
    }
  } = reactive({
    confirmation: {
      isLogin: false
    },
    matches: {
      data: [],
      lastVisible: null,
      searchOption: { status: 'FINISHED', competitionId: '', teamId: '', jstDate: '' }
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
    },
    match: {
      data: null,
      detail: null,
      reports: []
    },
    users: {
      data: [],
      lastVisible: null,
      searchOption: { status: '', competitionId: '', teamId: '', jstDate: '' }
    }
  })

  inject('store', store)

  const unsubscribe = () => {
    store.confirmation = { isLogin: false }
    store.matches = {
      data: [],
      lastVisible: null,
      searchOption: { status: 'FINISHED', competitionId: '', teamId: '', jstDate: '' }
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
    store.team = { data: null }
    store.match = {
      data: null,
      detail: null,
      reports: []
    }
    store.users = {
      data: [],
      lastVisible: null,
      searchOption: { status: '', competitionId: '', teamId: '', jstDate: '' }
    }
  }

  onGlobalSetup(() => {
    provide(StoreKey, store)
    onUnmounted(unsubscribe)
  })
})
