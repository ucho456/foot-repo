<template>
  <BaseSelectId
    :items="teams"
    :icon="'mdi-account-group'"
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
    competitionId: { type: Number, default: 0 },
    value: { type: Number, default: 0 }
  },

  setup(props, ctx) {
    const teams = computed(() => {
      return props.competitionId === 0
        ? [{ value: 0, text: '未選択' }]
        : props.competitionId === 1
        ? [
            { value: 0, text: '未選択' },
            { value: 1, text: 'teamA' },
            { value: 2, text: 'teamB' },
            { value: 3, text: 'teamC' },
            { value: 4, text: 'teamD' },
            { value: 5, text: 'teamE' }
          ]
        : [
            { value: 0, text: '未選択' },
            { value: 6, text: 'teamF' },
            { value: 7, text: 'teamG' },
            { value: 8, text: 'teamH' },
            { value: 9, text: 'teamI' },
            { value: 10, text: 'teamJ' }
          ]
    })
    const handleInput = (id: number): void => ctx.emit('input', id)
    return { teams, handleInput }
  }
})
</script>
