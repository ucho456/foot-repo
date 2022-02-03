<template>
  <BaseSelectId
    :items="players"
    :icon="'mdi-account-star'"
    :label="'マン・オブ・ザ・マッチ'"
    :value="value"
    @input="handleInput"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import BaseSelectId from '@/components/atoms/BaseSelectId.vue'

export default defineComponent({
  name: 'SelectIdMom',

  components: {
    BaseSelectId
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
    value: { type: Number, default: 0 }
  },

  setup(props, ctx) {
    const makePlayers = (reportItems: ReportItem[]): { value: number; text: string }[] => {
      return reportItems.map((ri) => {
        return { value: ri.id, text: ri.playerName }
      })
    }
    const players = computed(() => {
      return props.selectTeam === 'Home team only'
        ? makePlayers(props.homeTeamReportItems)
        : props.selectTeam === 'Away team only'
        ? makePlayers(props.awayTeamReportItems)
        : makePlayers(props.homeTeamReportItems.concat(props.awayTeamReportItems))
    })
    const handleInput = (id: number): void => ctx.emit('input', id)
    return { players, handleInput }
  }
})
</script>
