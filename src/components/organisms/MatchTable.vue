<template>
  <v-sheet>
    <v-toolbar flat>
      <h3>試合一覧</h3>
      <v-spacer />
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
      <v-container v-for="match in matches" :key="match.id">
        <v-list-item
          :exact="true"
          :router="true"
          :to="{ path: 'new', query: { matchId: match.id } }"
        >
          <v-list-item-avatar>
            <v-img :src="match.homeTeam.imageUrl" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-row>
              <v-col cols="6">
                <v-list-item-title class="text-right">{{ match.homeTeam.name }}</v-list-item-title>
              </v-col>
              <v-col cols="6">
                <v-list-item-title class="text-left">{{ match.awayTeam.name }}</v-list-item-title>
              </v-col>
            </v-row>
            <v-list-item-subtitle class="mt-n3 text-center">
              {{ match.homeTeam.score }} - {{ match.awayTeam.score }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-center">
              {{ match.jstDate }} / {{ match.competition.name }} / {{ match.matchday }}節
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-avatar>
            <v-img :src="match.awayTeam.imageUrl" />
          </v-list-item-avatar>
        </v-list-item>
      </v-container>
    </v-list>
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'MatchTable',

  props: {
    loading: { type: Boolean, default: false },
    matches: {
      type: Array as () => Match[],
      default: () => [
        {
          id: '',
          jstDate: '',
          matchday: 0,
          competition: { name: '' },
          homeTeam: { id: '', name: '', imageUrl: '', score: 0 },
          awayTeam: { id: '', name: '', imageUrl: '', score: 0 }
        }
      ]
    }
  },

  setup(_, ctx) {
    const handleClick = (): void => {
      ctx.emit('click')
    }

    return { handleClick }
  }
})
</script>
