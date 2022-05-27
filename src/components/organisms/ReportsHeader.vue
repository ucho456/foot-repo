<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="text-center"> {{ jstDate }} / {{ competition.name }} / {{ matchday }}節</v-col>
    </v-row>
    <v-row class="mt-n4">
      <v-col cols="5">
        <v-img
          class="center rounded-circle"
          max-height="60"
          max-width="60"
          :src="homeTeam.imageUrl"
        />
      </v-col>
      <v-col cols="2"></v-col>
      <v-col cols="5">
        <v-img
          class="center rounded-circle"
          max-height="60"
          max-width="60"
          :src="awayTeam.imageUrl"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center text-truncate" cols="5">
        <div>{{ homeTeam.name }}</div>
        <div>{{ homeTeam.score }}</div>
        <div v-if="isPK">{{ homeTeam.penalty }}</div>
      </v-col>
      <v-col class="text-center text-truncate" cols="2">
        <div>vs</div>
        <div>-</div>
        <div v-if="isPK">PK</div>
      </v-col>
      <v-col class="text-center text-truncate" cols="5">
        <div>{{ awayTeam.name }}</div>
        <div>{{ awayTeam.score }}</div>
        <div v-if="isPK">{{ awayTeam.penalty }}</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-truncate" cols="5">
        <v-row v-for="goalDatum in homeTeam.goalPlayers" :key="goalDatum.keyId">
          <v-col>{{ goalDatum.minute }}. {{ goalDatum.name }}</v-col>
        </v-row>
      </v-col>
      <v-col cols="2"></v-col>
      <v-col class="text-truncate" cols="5">
        <v-row v-for="goalDatum in awayTeam.goalPlayers" :key="goalDatum.keyId">
          <v-col>{{ goalDatum.minute }}. {{ goalDatum.name }}</v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ReportsHeader',

  props: {
    awayTeam: {
      type: Object as () => {
        name: string
        imageUrl: string
        score: number | null
        penalty: number | null
        goalPlayers: {
          keyId: string
          minute: number
          name: string
        }[]
      },
      default: () => {
        return {
          name: '',
          imageUrl: '',
          score: 0,
          penalty: 0,
          goalPlayers: []
        }
      }
    },
    competition: {
      type: Object as () => { name: string },
      default: () => {
        return { name: '' }
      }
    },
    homeTeam: {
      type: Object as () => {
        name: string
        imageUrl: string
        score: number | null
        penalty: number | null
        goalPlayers: {
          keyId: string
          minute: number
          name: string
        }[]
      },
      default: () => {
        return {
          name: '',
          imageUrl: '',
          score: 0,
          penalty: 0,
          goalPlayers: []
        }
      }
    },
    jstDate: { type: String, default: '' },
    matchday: { type: Number, default: 0 }
  },

  setup(props) {
    const isPK =
      props.homeTeam.score === props.awayTeam.score &&
      props.homeTeam.penalty !== null &&
      props.awayTeam.penalty !== null
    return { isPK }
  }
})
</script>

<style scoped>
.center {
  margin: 0 auto;
}
</style>
