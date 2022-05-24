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
          id: '',
          playerName: '',
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
          id: '',
          playerName: '',
          position: 'GK',
          shirtNumber: 0,
          point: '6.5',
          text: ''
        }
      ]
    },
    selectTeam: { type: String as () => HomeAway, default: 'home' },
    value: { type: String, default: '' }
  },

  setup(props, ctx) {
    const makePlayers = (reportItems: ReportItem[]): { id: string; text: string }[] => {
      return reportItems.map((ri) => {
        return { id: ri.id, text: ri.player.name }
      })
    }
    const players = computed(() => {
      return props.selectTeam === 'home'
        ? makePlayers(props.homeTeamReportItems)
        : props.selectTeam === 'away'
        ? makePlayers(props.awayTeamReportItems)
        : makePlayers(props.homeTeamReportItems.concat(props.awayTeamReportItems))
    })
    const handleInput = (id: string): void => {
      ctx.emit('input', id)
    }
    return { players, handleInput }
  }
})
</script>
