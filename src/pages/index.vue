<template>
  <v-container>
    <IndexReports :reports="reports" :is-loading="false" :err="''" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import IndexReports from '@/components/organisms/IndexReports.vue'

export default defineComponent({
  name: 'Index',

  components: {
    IndexReports
  },

  setup() {
    const reports = [
      {
        id: 1,
        avatar: '',
        title: 'title',
        userName: 'Satou Taro',
        description: 'homeTeamName 3 vs 1 awayTeamName / PremiaLeague 31/01/2021',
        to: 'reports/1'
      },
      {
        id: 2,
        avatar: '',
        title: 'title',
        userName: 'Satou Taro',
        description: 'homeTeamName 3 vs 1 awayTeamName / PremiaLeague 31/01/2021',
        to: 'reports/2'
      },
      {
        id: 3,
        avatar: '',
        title: 'title',
        userName: 'Satou Taro',
        description: 'homeTeamName 3 vs 1 awayTeamName / PremiaLeague 31/01/2021',
        to: 'reports/3'
      }
    ]
    return { reports }
  }
})
</script>
