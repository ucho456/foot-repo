<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="text-center">
        {{ data.match.utcDate.substring(0, 10) }} {{ data.match.competition.name }}</v-col
      >
    </v-row>
    <v-row class="mt-n4">
      <v-col cols="3">
        <v-row justify="center">
          <v-img
            class="rounded-circle"
            :src="`https://crests.football-data.org/${data.match.homeTeam.id}.svg`"
            max-height="60"
            max-width="60"
          />
        </v-row>
      </v-col>
      <v-col class="text-right text-truncate" cols="3">
        <div>{{ data.match.homeTeam.name }}</div>
        <div>{{ data.match.score.fullTime.homeTeam }}</div>
      </v-col>
      <v-col class="text-left text-truncate" cols="3">
        <div>{{ data.match.awayTeam.name }}</div>
        <div>{{ data.match.score.fullTime.awayTeam }}</div>
      </v-col>
      <v-col cols="3">
        <v-row justify="center">
          <v-img
            class="rounded-circle"
            :src="`https://crests.football-data.org/${data.match.awayTeam.id}.svg`"
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

interface Data {
  match: { competition: { name: string } }
  utcDate: string
  homeTeam: { id: number; name: string }
  awayTeam: { id: number; name: string }
  score: { fullTime: { homeTeam: number; awayTeam: number } }
}

export default defineComponent({
  name: 'ReportsNewHeader',

  props: {
    data: {
      type: Object as () => Data,
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
