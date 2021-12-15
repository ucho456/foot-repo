<template>
  <v-sheet>
    <v-toolbar flat>
      <v-toolbar-title>試合一覧</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="handleClick">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container v-if="isLoading" class="pb-10">
      <v-row justify="center">
        <v-progress-circular indeterminate color="darkBlue" />
      </v-row>
    </v-container>
    <v-list v-else three-line class="mt-n4">
      <v-container v-if="err" class="mt-4">
        <v-row justify="center">
          {{ err }}
        </v-row>
      </v-container>
      <template v-for="match in dispMatches">
        <v-list-item :key="`${match.id}-match`" :to="match.to" router exact>
          <v-list-item-avatar>
            <v-img v-if="match.homeTeamImg !== ''" :src="match.homeTeamImg" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-center">{{ match.firstLine }}</v-list-item-title>
            <v-list-item-subtitle class="text-center">{{ match.secondLine }}</v-list-item-subtitle>
            <v-list-item-subtitle class="text-center">{{ match.thirdLine }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-avatar>
            <v-img v-if="match.awayTeamImg !== ''" :src="match.awayTeamImg" />
          </v-list-item-avatar>
        </v-list-item>
      </template>
    </v-list>
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

interface Competition {
  id: number
  area: { name: string }
  name: string
}
interface Match {
  id: number
  utcDate: string
  score: { fullTime: { homeTeam: number | null; awayTeam: number | null } }
  homeTeam: { id: number; name: string }
  awayTeam: { id: number; name: string }
}

export default defineComponent({
  name: 'ReportsSearchMatchList',

  props: {
    competition: {
      type: Object as () => Competition,
      default: () => ({ id: 0, area: { name: '' }, name: '' })
    },
    err: { type: String, default: '' },
    isLoading: { type: Boolean, default: false },
    matches: {
      type: Array as () => Match[],
      default: () => [
        {
          id: 0,
          utcDate: '',
          score: { fullTime: { homeTeam: null, awayTeam: null } },
          homeTeam: { id: 0, name: '' },
          awayTeam: { id: 0, name: '' }
        }
      ]
    }
  },

  setup(props, ctx) {
    const dispMatches = computed(() => {
      if (!props.matches || !props.competition) return
      return props.matches.map((match) => {
        const homeTeamScore = match.score.fullTime.homeTeam ? match.score.fullTime.homeTeam : 0
        const awayTeamScore = match.score.fullTime.awayTeam ? match.score.fullTime.awayTeam : 0
        return {
          id: match.id,
          homeTeamImg: match.homeTeam.id
            ? `https://crests.football-data.org/${match.homeTeam.id}.svg`
            : '',
          awayTeamImg: match.awayTeam.id
            ? `https://crests.football-data.org/${match.awayTeam.id}.svg`
            : '',
          firstLine: `${match.homeTeam.name} ${homeTeamScore} - ${awayTeamScore} ${match.awayTeam.name}`,
          secondLine: `${match.utcDate.substring(0, 10)}`,
          thirdLine: `${props.competition.name} - ${props.competition.area.name}`,
          to: '/'
        }
      })
    })
    const handleClick = (): void => ctx.emit('click')
    return { handleClick, dispMatches }
  }
})
</script>
