<template>
  <div>
    {{ matchData }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api' //, useRoute
// import getMatches from '@/utils/api/getMatches'
import { matchData } from '@/utils/testData'

export default defineComponent({
  name: 'ReportNew',

  setup() {
    /*
    const { res, err, isLoading, getTrigger } = getMatches()
    const route = useRoute()
    getTrigger(`/matches/${route.value.query.matchId}`)
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
