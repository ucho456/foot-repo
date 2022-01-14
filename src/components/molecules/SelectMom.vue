<template>
  <BaseSelect
    :value="value"
    :items="players"
    :icon="'mdi-account-star'"
    :label="'マン・オブ・ザ・マッチ'"
    @input="handleInput"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import BaseSelect from '@/components/atoms/BaseSelect.vue'

export default defineComponent({
  name: 'SelectFormat',

  components: {
    BaseSelect
  },

  props: {
    awayTeamReportItems: {
      type: Array as () => ReportItem[],
      default: () => [
        {
          id: 0,
          homeAway: 'away',
          playerName: '',
          position: 'FW',
          positionId: 4,
          shirtNumber: 10,
          point: 6.5,
          text: ''
        }
      ]
    },
    homeTeamReportItems: {
      type: Array as () => ReportItem[],
      default: () => [
        {
          id: 0,
          homeAway: 'home',
          playerName: '',
          position: 'FW',
          positionId: 4,
          shirtNumber: 10,
          point: 6.5,
          text: ''
        }
      ]
    },
    reportTeam: { type: String as () => ReportTeam, default: 'Home team only' },
    value: { type: String, default: '' }
  },

  setup(props, ctx) {
    const players = computed(() => {
      return props.reportTeam === 'Home team only'
        ? props.homeTeamReportItems.map((v) => v.playerName)
        : props.reportTeam === 'Away team only'
        ? props.awayTeamReportItems.map((v) => v.playerName)
        : props.homeTeamReportItems.concat(props.awayTeamReportItems).map((v) => v.playerName)
    })
    const handleInput = (value: string): void => ctx.emit('input', value)
    return { players, handleInput }
  }
})
</script>
