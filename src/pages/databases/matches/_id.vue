<template>
  <v-container>
    <v-card outlined> {{ match }} </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import useShow from '@/composables/databases/matches/useShow'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'

export default defineComponent({
  name: 'MatchShow',

  components: {},

  setup() {
    const route = useRoute()
    const { setUp } = useShow()
    const { openSnackbar } = useSnackbar()
    const { match } = useStore()

    const setUpPage = async () => {
      const matchId = route.value.params.id as string
      console.log(matchId)
      if (!match.data || (match.data && match.data.id !== matchId)) {
        const result = await setUp(matchId)
        if (result === 'failure') {
          openSnackbar(result, 'データの取得に失敗しました。')
        }
      }
    }
    setUpPage()

    return { match }
  }
})
</script>
