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
        <v-progress-circular color="darkBlue" indeterminate />
      </v-row>
    </v-container>
    <v-list v-else class="mt-n4" three-line>
      <v-container v-if="err" class="mt-4">
        <v-row justify="center">
          {{ err }}
        </v-row>
      </v-container>
      <template v-for="match in displayMatches">
        <v-list-item :key="`${match.id}-match`" :to="match.to" exact router>
          <v-list-item-avatar>
            <v-img v-if="match.homeTeamImg !== ''" :src="match.homeTeamImg" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-row>
              <v-col cols="6"
                ><v-list-item-title class="text-right">{{
                  match.homeTeamName
                }}</v-list-item-title></v-col
              >
              <v-col cols="6"
                ><v-list-item-title class="text-left">{{
                  match.awayTeamName
                }}</v-list-item-title></v-col
              >
            </v-row>
            <v-list-item-subtitle class="mt-n3 text-center">{{ match.score }}</v-list-item-subtitle>
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
    const displayMatches = computed(() => {
      if (!props.matches || !props.competition) return []
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
          homeTeamName: match.homeTeam.name,
          awayTeamName: match.awayTeam.name,
          score: `${homeTeamScore} - ${awayTeamScore}`,
          thirdLine: `${match.utcDate.substring(0, 10)} ${props.competition.name}`,
          to: '/'
        }
      })
    })
    const handleClick = (): void => ctx.emit('click')
    return { handleClick, displayMatches }
  }
})
</script>
