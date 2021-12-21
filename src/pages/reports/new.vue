<template>
  <div>
    {{ matchData }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api' //, useRoute
// import getFootballData from '@/utils/api/getFootballData'
import { matchData } from '@/utils/testData'

export default defineComponent({
  name: 'ReportNew',

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
