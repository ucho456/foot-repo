<template>
  <BaseSelectId :items="teams" :label="'チーム'" :value="value" @input="handleInput" />
</template>

<script lang="ts">
/** check */
import { computed, defineComponent } from '@nuxtjs/composition-api'
import {
  bundesligaTeams,
  laLigaTeams,
  ligue1Teams,
  premierLeagueTeams,
  serieATeams
} from '@/db/teams'
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
      return props.competitionId === 'Premier-League'
        ? premierLeagueTeams
        : props.competitionId === 'La-Liga'
        ? laLigaTeams
        : props.competitionId === 'Serie-A'
        ? serieATeams
        : props.competitionId === 'Bundesliga'
        ? bundesligaTeams
        : props.competitionId === 'Ligue-1'
        ? ligue1Teams
        : [{ id: '', name: 'コンペティションを選択して下さい。' }]
    })
    const handleInput = (id: string): void => ctx.emit('input', id)

    return { handleInput, teams }
  }
})
</script>
