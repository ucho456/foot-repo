<template>
  <BaseSelectId
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
      { id: '', name: '未選択' },
      { id: 'J-League', name: 'J. League' },
      { id: 'Premier-League', name: 'Premier League' },
      { id: 'La-Liga', name: 'La Liga' },
      { id: 'Serie-A', name: 'Serie A' },
      { id: 'Bundesliga', name: 'Bundesliga' }
    ]
    const handleInput = (competitionId: string): void => {
      ctx.emit('input', competitionId)
    }

    return { competitions, handleInput }
  }
})
</script>
