<template>
  <v-row class="text-center text-truncate">
    <v-container>
      <v-row>
        <v-col v-if="stage === 'REGULAR_SEASON'" cols="12">
          {{ jstDate }} / {{ competition.name }} / {{ matchday }}節
        </v-col>
        <v-col v-else cols="12"> {{ jstDate }} / {{ competition.name }} / {{ stage }} </v-col>
        <v-col class="mt-n7" cols="12"> {{ venue }}</v-col>
      </v-row>
      <v-row class="mt-n4">
        <v-col cols="5">
          <v-img
            class="mx-auto"
            max-height="60"
            max-width="60"
            :lazy-src="lazy"
            :src="homeTeam.imageUrl"
          />
        </v-col>
        <v-spacer />
        <v-col cols="5">
          <v-img
            class="mx-auto"
            max-height="60"
            max-width="60"
            :lazy-src="lazy"
            :src="awayTeam.imageUrl"
          />
        </v-col>
      </v-row>
      <v-row class="mt-n5">
        <v-col cols="5">
          <div class="text-truncate">{{ homeTeam.name }}</div>
          <div>{{ homeTeam.score }}</div>
          <div v-if="isPK">{{ homeTeam.penalty }}</div>
        </v-col>
        <v-col cols="2">
          <div>vs</div>
          <div>-</div>
          <div v-if="isPK">PK</div>
        </v-col>
        <v-col cols="5">
          <div class="text-truncate">{{ awayTeam.name }}</div>
          <div>{{ awayTeam.score }}</div>
          <div v-if="isPK">{{ awayTeam.penalty }}</div>
        </v-col>
      </v-row>
    </v-container>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'RowMatchHeader',

  props: {
    awayTeam: {
      type: Object as () => {
        name: string
        imageUrl: string
        score: number | null
        penalty: number | null
      },
      default: () => {}
    },
    competition: {
      type: Object as () => { name: string },
      default: () => {}
    },
    homeTeam: {
      type: Object as () => {
        name: string
        imageUrl: string
        score: number | null
        penalty: number | null
      },
      default: () => {}
    },
    jstDate: { type: String, default: '' },
    matchday: { type: Number, default: 0 },
    stage: { type: String, default: '' },
    venue: { type: String, default: '' }
  },

  setup(props) {
    const lazy = require('@/assets/lazy.png')

    const isPK =
      props.homeTeam.score === props.awayTeam.score &&
      props.homeTeam.penalty !== null &&
      props.awayTeam.penalty !== null

    return { isPK, lazy }
  }
})
</script>
