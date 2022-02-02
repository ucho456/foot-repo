<template>
  <BaseSelect
    :items="players"
    :icon="'mdi-account-star'"
    :label="'マン・オブ・ザ・マッチ'"
    :value="value"
    @input="handleInput"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import BaseSelect from '@/components/atoms/BaseSelect.vue'

export default defineComponent({
  name: 'SelectMom',

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
          positionId: 1,
          position: 'GK',
          shirtNumber: 0,
          point: '6.5',
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
          positionId: 1,
          position: 'GK',
          shirtNumber: 0,
          point: '6.5',
          text: ''
        }
      ]
    },
    selectTeam: { type: String as () => ReportSelectTeam, default: 'Home team only' },
    value: { type: String, default: '' }
  },

  setup(props, ctx) {
    const players = computed(() => {
      return props.selectTeam === 'Home team only'
        ? props.homeTeamReportItems.map((htri) => htri.playerName)
        : props.selectTeam === 'Away team only'
        ? props.awayTeamReportItems.map((atri) => atri.playerName)
        : props.homeTeamReportItems.concat(props.awayTeamReportItems).map((ri) => ri.playerName)
    })
    const handleInput = (value: string): void => ctx.emit('input', value)
    return { players, handleInput }
  }
})
</script>
