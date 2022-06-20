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
      return props.competitionId === 'J-League'
        ? [
            { id: '5850', name: 'FC Tokyo' },
            { id: '5851', name: 'Gamba Osaka' },
            { id: '5852', name: 'Hokkaido Consadole Sapporo' }
          ]
        : props.competitionId === 'Premier-League'
        ? [
            { id: '65', name: 'Manchester City FC' },
            { id: '64', name: 'Liverpool FC' },
            { id: '61', name: 'Chelsea FC' }
          ]
        : props.competitionId === 'La-Liga'
        ? [
            { id: '86', name: 'Real Madrid CF' },
            { id: '81', name: 'FC Barcelona' },
            { id: '559', name: 'Sevilla FC' }
          ]
        : props.competitionId === 'Serie-A'
        ? [
            { id: '100', name: 'AS Roma' },
            { id: '102', name: 'Atalanta BC' },
            { id: '103', name: 'Bologna FC 1909' }
          ]
        : props.competitionId === 'Bundesliga'
        ? [
            { id: '1', name: '1. FC Köln' },
            { id: '2', name: 'TSG 1899 Hoffenheim' },
            { id: '4', name: 'Borussia Dortmund' }
          ]
        : [{ id: '', name: 'コンペティションを選択して下さい。' }]
    })
    const handleInput = (id: string): void => {
      ctx.emit('input', id)
    }

    return { teams, handleInput }
  }
})
</script>
