<template>
  <BaseSelectId
    :icon="'mdi-soccer'"
    :items="teams"
    :label="'チーム'"
    :value="value"
    @input="handleInput"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import BaseSelectId from '@/components/atoms/BaseSelectId.vue'

export default defineComponent({
  name: 'SelectIdTeam',

  components: {
    BaseSelectId
  },

  props: {
    competitionId: { type: String, default: '' },
    value: { type: String, default: '' }
  },

  setup(props, ctx) {
    const teams = computed(() => {
      return props.competitionId === '2119' // J. League
        ? [
            { id: '5850', text: 'FC Tokyo' },
            { id: '5851', text: 'Gamba Osaka' },
            { id: '5852', text: 'Hokkaido Consadole Sapporo' }
          ]
        : props.competitionId === '2021' // Premier League
        ? [
            { id: '65', text: 'Manchester City FC' },
            { id: '64', text: 'Liverpool FC' },
            { id: '61', text: 'Chelsea FC' }
          ]
        : props.competitionId === '2014' // La Liga
        ? [
            { id: '86', text: 'Real Madrid CF' },
            { id: '81', text: 'FC Barcelona' },
            { id: '559', text: 'Sevilla FC' }
          ]
        : props.competitionId === '2019' // Serie A
        ? [
            { id: '100', text: 'AS Roma' },
            { id: '102', text: 'Atalanta BC' },
            { id: '103', text: 'Bologna FC 1909' }
          ]
        : props.competitionId === '2002' // Bundesliga
        ? [
            { id: '1', text: '1. FC Köln' },
            { id: '2', text: 'TSG 1899 Hoffenheim' },
            { id: '4', text: 'Borussia Dortmund' }
          ]
        : [{ id: '', text: '未選択' }]
    })
    const handleInput = (id: string): void => {
      ctx.emit('input', id)
    }

    return { teams, handleInput }
  }
})
</script>
