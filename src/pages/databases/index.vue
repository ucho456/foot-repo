<template>
  <v-card outlined>
    <v-container fluid>
      <v-row dense>
        <v-col v-for="card in cards" :key="card.title" cols="6" sm="4">
          <v-card :to="card.to">
            <v-card-text>
              <v-img :src="card.src" />
            </v-card-text>
            <v-card-text class="font-weight-bold text-center">
              {{ card.title }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Databases',

  setup() {
    const cards = [
      { title: 'J. League', src: require('@/assets/JJL.jpg'), to: '/' },
      { title: 'Premier League', src: require('@/assets/PL.png'), to: '/' },
      { title: 'La Liga', src: require('@/assets/PD.png'), to: '/' },
      { title: 'Serie A', src: require('@/assets/SA.png'), to: '/' },
      { title: 'Bundesliga', src: require('@/assets/BL1.png'), to: '/' }
    ]
    return { cards }
  }
})
</script>

<style lang="scss" scoped>
.text-center {
  text-align: center;
}
</style>
