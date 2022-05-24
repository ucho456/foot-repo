<template>
  <v-card outlined> あああ </v-card>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'LeagueShow',

  components: {},

  setup() {
    const route = useRoute()

    const competitionId = route.value.params.id as string
    console.log(competitionId)
    return {}
  }
})
</script>
