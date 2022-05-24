<template>
  <v-card outlined>
    {{ standings }}
    <br />
    {{ scorers }}
  </v-card>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import useShow from '@/composables/databases/leagues/useShow'
import useSnackbar from '@/utils/useSnackbar'

export default defineComponent({
  name: 'LeagueShow',

  components: {},

  setup() {
    const route = useRoute()
    const { standings, scorers, season, isLoadingStandings, isLoadingScorers, setUp } = useShow()
    const { openSnackbar } = useSnackbar()

    const setUpPage = async () => {
      const competitionId = route.value.params.id as string
      const result = await setUp(competitionId)
      if (result === 'failure') {
        openSnackbar(result, 'データの取得に失敗しました。')
      }
    }
    setUpPage()

    return { standings, scorers, season, isLoadingStandings, isLoadingScorers }
  }
})
</script>
