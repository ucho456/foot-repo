import { defineNuxtPlugin, onGlobalSetup, provide, reactive } from '@nuxtjs/composition-api'
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
      hasNext: boolean
    }
    reports: {
      data: Report[]
      lastVisible: QueryDocumentSnapshot<Report> | null
      searchOption: SearchOption
      hasNext: boolean
    }
    league: {
      name: string
      competitionId: string
      standings: Standings | null
      scorers: Scorers | null
      matchSchedule: Match[]
      lastVisible: QueryDocumentSnapshot<Match> | null
      hasNext: boolean
      season: string
      yearMonth: string
    }
    cup: {
      name: string
      competitionId: string
      standings: Standings | null
      scorers: Scorers | null
      matchSchedule: Match[]
      lastVisible: QueryDocumentSnapshot<Match> | null
      hasNext: boolean
      season: string
      yearMonth: string
    }
    japan: {
      matchSchedule: Match[]
      season: string
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
      hasNext: boolean
    }
  } = reactive({
    confirmation: {
      isLogin: false
    },
    matches: {
      data: [],
      lastVisible: null,
      searchOption: { status: 'FINISHED', competitionId: '', teamId: '', yearMonth: '' },
      hasNext: true
    },
    reports: {
      data: [],
      lastVisible: null,
      searchOption: { status: '', competitionId: '', teamId: '', yearMonth: '' },
      hasNext: true
    },
    league: {
      name: '',
      competitionId: '',
      standings: null,
      scorers: null,
      matchSchedule: [],
      lastVisible: null,
      hasNext: true,
      season: '',
      yearMonth: ''
    },
    cup: {
      name: '',
      competitionId: '',
      standings: null,
      scorers: null,
      matchSchedule: [],
      lastVisible: null,
      hasNext: true,
      season: '',
      yearMonth: ''
    },
    japan: {
      matchSchedule: [],
      season: String(new Date().getFullYear())
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
      searchOption: { status: '', competitionId: '', teamId: '', yearMonth: '' },
      hasNext: true
    }
  })

  inject('store', store)

  onGlobalSetup(() => {
    provide(StoreKey, store)
  })
})
