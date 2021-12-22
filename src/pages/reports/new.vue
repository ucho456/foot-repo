<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" sm="10">
        <ReportsNewHeader :data="matchData" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api' //, useRoute
import ReportsNewHeader from '@/components/organisms/ReportsNewHeader.vue'
// import getFootballData from '@/utils/api/getFootballData'
import { matchData } from '@/utils/testData'

export default defineComponent({
  name: 'ReportNew',

  components: {
    ReportsNewHeader
  },

  layout: 'noside',

  setup() {
    /*
      有料プラン契約後に実装
      const { res, err, isLoading, getMatches } = getFootballData()
      const route = useRoute()
      getMatches(`/matches/${route.value.query.matchId}`)
    */
    return {
      // res,
      // err,
      // isLoading,
      matchData
    }
  }
})
</script>
