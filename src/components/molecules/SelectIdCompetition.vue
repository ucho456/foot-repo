<template>
  <BaseSelectId
    :items="competitions"
    :label="'コンペティション'"
    :value="value"
    @input="handleInput"
  />
</template>

<script lang="ts">
/** check */
import { defineComponent } from '@nuxtjs/composition-api'
import BaseSelectId from '@/components/atoms/BaseSelectId.vue'

export default defineComponent({
  name: 'SelectIdCompetition',

  components: {
    BaseSelectId
  },

  props: {
    leagueOnly: { type: Boolean, default: false },
    value: { type: String, default: '' }
  },

  setup(props, ctx) {
    const competitions = props.leagueOnly
      ? [
          { id: '', name: 'すべて' },
          // { id: 'J-League', name: 'J. League' },
          { id: 'Premier-League', name: 'Premier League' },
          { id: 'La-Liga', name: 'La Liga' },
          { id: 'Serie-A', name: 'Serie A' },
          { id: 'Bundesliga', name: 'Bundesliga' },
          { id: 'Ligue-1', name: 'Ligue 1' }
        ]
      : [
          { id: '', name: 'すべて' },
          // { id: 'J-League', name: 'J. League' },
          { id: 'World-Cup', name: 'World Cup' },
          { id: 'Champions-League', name: 'Champions League' },
          { id: 'Premier-League', name: 'Premier League' },
          { id: 'La-Liga', name: 'La Liga' },
          { id: 'Serie-A', name: 'Serie A' },
          { id: 'Bundesliga', name: 'Bundesliga' },
          { id: 'Ligue-1', name: 'Ligue 1' }
        ]
    const handleInput = (competitionId: string): void => ctx.emit('input', competitionId)

    return { competitions, handleInput }
  }
})
</script>
