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
      { id: '2119', text: 'J. League' },
      { id: '2021', text: 'Premier League' },
      { id: '2014', text: 'La Liga' },
      { id: '2019', text: 'Serie A' },
      { id: '2002', text: 'Bundesliga' }
    ]
    const handleInput = (competitionId: string): void => {
      ctx.emit('input', competitionId)
    }

    return { competitions, handleInput }
  }
})
</script>
