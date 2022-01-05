<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="text-center">
        {{ match.utcDate.substring(0, 10) }} {{ match.competition.name }}</v-col
      >
    </v-row>
    <v-row class="mt-n4">
      <v-col cols="3">
        <v-row justify="center">
          <v-img
            class="rounded-circle"
            :src="`https://crests.football-data.org/${match.homeTeam.id}.svg`"
            max-height="60"
            max-width="60"
          />
        </v-row>
      </v-col>
      <v-col class="text-right text-truncate" cols="3">
        <div>{{ match.homeTeam.name }}</div>
        <div>{{ match.score.fullTime.homeTeam }}</div>
      </v-col>
      <v-col class="text-left text-truncate" cols="3">
        <div>{{ match.awayTeam.name }}</div>
        <div>{{ match.score.fullTime.awayTeam }}</div>
      </v-col>
      <v-col cols="3">
        <v-row justify="center">
          <v-img
            class="rounded-circle"
            :src="`https://crests.football-data.org/${match.awayTeam.id}.svg`"
            max-height="60"
            max-width="60"
          />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ReportsNewHeader',

  props: {
    match: {
      type: Object as () => Match,
      default: () => ({
        match: { competition: { name: '' } },
        utcDate: '',
        homeTeam: { id: 0, name: '' },
        awayTeam: { id: 0, name: '' },
        score: { fullTime: { homeTeam: 0, awayTeam: 0 } }
      })
    }
  }
})
</script>
