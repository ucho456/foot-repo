<template>
  <v-sheet>
    <v-toolbar flat>
      <v-toolbar-title>試合一覧</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="handleClick">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container v-if="loading" class="pb-10">
      <v-row justify="center">
        <v-progress-circular color="primary" indeterminate />
      </v-row>
    </v-container>
    <v-list v-else class="mt-n4" three-line>
      <template v-for="match in matches">
        <v-list-item
          :key="match.id"
          :to="{ path: 'new', query: { matchId: match.id } }"
          exact
          router
        >
          <v-list-item-avatar>
            <v-img :src="`https://crests.football-data.org/${match.homeTeam.id}.svg`" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-row>
              <v-col cols="6"
                ><v-list-item-title class="text-right">{{
                  match.homeTeam.name
                }}</v-list-item-title></v-col
              >
              <v-col cols="6"
                ><v-list-item-title class="text-left">{{
                  match.awayTeam.name
                }}</v-list-item-title></v-col
              >
            </v-row>
            <v-list-item-subtitle class="mt-n3 text-center"
              >{{ match.homeTeam.score }} - {{ match.awayTeam.score }}</v-list-item-subtitle
            >
            <v-list-item-subtitle class="text-center"
              >{{ match.jstDate }} - {{ match.competition.name }}
              {{ match.matchday }}節</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-avatar>
            <v-img :src="`https://crests.football-data.org/${match.awayTeam.id}.svg`" />
          </v-list-item-avatar>
        </v-list-item>
      </template>
    </v-list>
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { Match } from '@/types/matches'

export default defineComponent({
  name: 'MatchTable',

  props: {
    loading: { type: Boolean, default: false },
    matches: {
      type: Array as () => Match[],
      default: () => [
        {
          id: '',
          season: '',
          jstDate: '00000000',
          matchday: 0,
          status: 'SCHEDULED',
          competition: {
            id: '',
            name: ''
          },
          homeTeam: {
            id: '',
            name: '',
            score: 0,
            penalty: 0,
            goalPlayers: [
              {
                minute: 0,
                name: ''
              }
            ]
          },
          awayTeam: {
            id: '',
            name: '',
            score: 0,
            penalty: 0,
            goalPlayers: [
              {
                minute: 0,
                name: ''
              }
            ]
          }
        }
      ]
    }
  },

  setup(_, ctx) {
    const handleClick = (): void => ctx.emit('click')
    return { handleClick }
  }
})
</script>
