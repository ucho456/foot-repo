<template>
  <BaseSelectId :items="teams" :label="'チーム'" :value="value" @input="handleInput" />
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import {
  jLeagueTeams,
  premierLeagueTeams,
  laLigaTeams,
  serieATeams,
  bundesligaTeams
} from '@/utils/selectTeams'
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
        ? jLeagueTeams
        : props.competitionId === 'Premier-League'
        ? premierLeagueTeams
        : props.competitionId === 'La-Liga'
        ? laLigaTeams
        : props.competitionId === 'Serie-A'
        ? serieATeams
        : props.competitionId === 'Bundesliga'
        ? bundesligaTeams
        : [{ id: '', name: 'コンペティションを選択して下さい。' }]
    })
    const handleInput = (id: string): void => {
      ctx.emit('input', id)
    }

    return { teams, handleInput }
  }
})
</script>
