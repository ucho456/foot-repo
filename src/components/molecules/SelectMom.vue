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
          position: 'GK',
          positionId: 1,
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
          position: 'GK',
          positionId: 1,
          shirtNumber: 0,
          point: '6.5',
          text: ''
        }
      ]
    },
    selectTeam: { type: String as () => SelectTeam, default: 'Home team only' },
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
