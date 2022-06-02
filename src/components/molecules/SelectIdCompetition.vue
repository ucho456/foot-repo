<template>
  <BaseSelectId
    :icon="'mdi-tournament'"
    :items="competitions"
    :label="'コンペティション'"
    :value="value"
    @input="handleInput"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BaseSelectId from '@/components/atoms/BaseSelectId.vue'

export default defineComponent({
  name: 'SelectIdCompetition',

  components: {
    BaseSelectId
  },

  props: {
    value: { type: String, default: '' }
  },

  setup(_, ctx) {
    const competitions = [
      { id: '', text: '未選択' },
      { id: 'J-League', text: 'J. League' },
      { id: 'Premier-League', text: 'Premier League' },
      { id: 'La-Liga', text: 'La Liga' },
      { id: 'Serie-A', text: 'Serie A' },
      { id: 'Bundesliga', text: 'Bundesliga' }
    ]
    const handleInput = (competitionId: string): void => {
      ctx.emit('input', competitionId)
    }

    return { competitions, handleInput }
  }
})
</script>
