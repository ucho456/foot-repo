<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="text-center"> {{ utcDate.substring(0, 10) }} {{ competitionName }}</v-col>
    </v-row>
    <v-row class="mt-n4">
      <v-col cols="3">
        <v-row justify="center">
          <v-img
            class="rounded-circle"
            :src="`https://crests.football-data.org/${homeTeamId}.svg`"
            max-height="60"
            max-width="60"
          />
        </v-row>
      </v-col>
      <v-col class="text-right text-truncate" cols="3">
        <div>{{ homeTeamName }}</div>
        <div>{{ homeTeamScore }}</div>
      </v-col>
      <v-col class="text-left text-truncate" cols="3">
        <div>{{ awayTeamName }}</div>
        <div>{{ awayTeamScore }}</div>
      </v-col>
      <v-col cols="3">
        <v-row justify="center">
          <v-img
            class="rounded-circle"
            :src="`https://crests.football-data.org/${awayTeamId}.svg`"
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
    awayTeamId: { type: Number, default: 0 },
    awayTeamName: { type: String, default: '' },
    awayTeamScore: { type: Number, default: 0 },
    competitionName: { type: String, default: '' },
    homeTeamId: { type: Number, default: 0 },
    homeTeamName: { type: String, default: '' },
    homeTeamScore: { type: Number, default: 0 },
    utcDate: { type: String, default: '' }
  }
})
</script>
