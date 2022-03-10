import { computed } from '@nuxtjs/composition-api'

export const navigationDrawerItems = computed(() => {
  return [
    { id: 1, icon: 'mdi-home', title: 'ホーム', to: '/' },
    { id: 2, icon: 'mdi-pencil-plus', title: 'レポート作成', to: '/reports/search' },
    { id: 3, icon: 'mdi-login', title: 'ログイン', to: '/login' },
    { id: 4, icon: 'mdi-account-plus', title: '新規登録', to: '/signup' }
  ]
})
