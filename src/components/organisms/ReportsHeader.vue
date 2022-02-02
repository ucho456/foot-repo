<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="text-center"> {{ utcDate.substring(0, 10) }} {{ competitionName }}</v-col>
    </v-row>
    <v-row class="mt-n4">
      <v-col cols="5">
        <v-row justify="center">
          <v-img
            class="rounded-circle"
            max-height="60"
            max-width="60"
            :src="`https://crests.football-data.org/${homeTeamId}.svg`"
          />
        </v-row>
      </v-col>
      <v-col cols="2"></v-col>
      <v-col cols="5">
        <v-row justify="center">
          <v-img
            class="rounded-circle"
            max-height="60"
            max-width="60"
            :src="`https://crests.football-data.org/${awayTeamId}.svg`"
          />
        </v-row>
      </v-col>
      <v-col class="text-center text-truncate" cols="5">
        <div>{{ homeTeamName }}</div>
        <div>{{ homeTeamScore }}</div>
        <div v-if="isPK">{{ homeTeamPenalty }}</div>
      </v-col>
      <v-col class="text-center text-truncate" cols="2">
        <div>vs</div>
        <div>-</div>
        <div v-if="isPK">PK</div>
      </v-col>
      <v-col class="text-center text-truncate" cols="5">
        <div>{{ awayTeamName }}</div>
        <div>{{ awayTeamScore }}</div>
        <div v-if="isPK">{{ awayTeamPenalty }}</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ReportsHeader',

  props: {
    awayTeamId: { type: Number, default: 0 },
    awayTeamName: { type: String, default: '' },
    awayTeamPenalty: { type: Number, default: 0 },
    awayTeamScore: { type: Number, default: 0 },
    competitionName: { type: String, default: '' },
    homeTeamId: { type: Number, default: 0 },
    homeTeamName: { type: String, default: '' },
    homeTeamPenalty: { type: Number, default: 0 },
    homeTeamScore: { type: Number, default: 0 },
    utcDate: { type: String, default: '' }
  },

  setup(props) {
    const isPK =
      props.homeTeamScore === props.awayTeamScore &&
      props.homeTeamPenalty !== 0 &&
      props.awayTeamPenalty !== 0
    return { isPK }
  }
})
</script>
