<template>
  <v-card outlined> {{ team }} </v-card>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import useShow from '@/composables/databases/teams/useShow'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'

export default defineComponent({
  name: 'TeamShow',

  setup() {
    const route = useRoute()
    const { isLoading, setUp } = useShow()
    const { openSnackbar } = useSnackbar()
    const { team } = useStore()

    const setUpPage = async (): Promise<void> => {
      const teamId = route.value.params.id as string
      if (!team.data || (team.data && team.data.id !== teamId)) {
        const result = await setUp(teamId)
        if (result === 'failure') {
          openSnackbar(result, 'データの取得に失敗しました。')
        }
      }
    }
    setUpPage()

    return { isLoading, team }
  }
})
</script>
