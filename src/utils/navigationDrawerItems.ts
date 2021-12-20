import { computed } from '@nuxtjs/composition-api'

export const navigationDrawerItems = computed(() => {
  return [
    { key: 1, icon: 'mdi-home', title: 'ホーム', to: '/' },
    { key: 2, icon: 'mdi-pencil-plus', title: 'レポート作成', to: '/reports/search' },
    { key: 3, icon: 'mdi-login', title: 'ログイン', to: '/login' }
  ]
})
