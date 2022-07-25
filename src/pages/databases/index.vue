<template>
  <v-container>
    <v-card outlined>
      <v-container fluid>
        <v-row dense>
          <v-col v-for="competition in competitions" :key="competition.title" cols="6" sm="4">
            <v-card :to="competition.to">
              <v-img :height="183" :lazy-src="lazy" :src="competition.src" />
              <v-card-text class="font-weight-bold text-center" style="height: 70px">
                {{ competition.title }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Databases',

  setup() {
    const lazy = require('@/assets/lazy.png')

    const competitions: {
      id: string
      title: string
      src: string
      to?: string
      type: CompetitionType
    }[] = [
      {
        id: 'Japan',
        title: '日本代表',
        src: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg',
        to: '/databases/japan',
        type: 'japan'
      },
      {
        id: 'J-League',
        title: 'J. League（準備中）',
        src: 'https://firebasestorage.googleapis.com/v0/b/foot-repo.appspot.com/o/JJL.jpg?alt=media&token=1625822d-a6dc-4bb9-a018-23506a19fbd3',
        // to: '/databases/leagues/J-League',
        type: 'league'
      },
      {
        id: 'Premier-League',
        title: 'Premier League',
        src: 'https://crests.football-data.org/PL.png',
        to: '/databases/leagues/Premier-League',
        type: 'league'
      },
      {
        id: 'La-Liga',
        title: 'La Liga',
        src: 'https://crests.football-data.org/PD.png',
        to: '/databases/leagues/La-Liga',
        type: 'league'
      },
      {
        id: 'Serie-A',
        title: 'Serie A',
        src: 'https://crests.football-data.org/SA.png',
        to: '/databases/leagues/Serie-A',
        type: 'league'
      },
      {
        id: 'Bundesliga',
        title: 'Bundesliga',
        src: 'https://crests.football-data.org/BL1.png',
        to: '/databases/leagues/Bundesliga',
        type: 'league'
      },
      {
        id: 'Ligue-1',
        title: 'Ligue 1',
        src: 'https://crests.football-data.org/FL1.png',
        to: '/databases/leagues/Ligue-1',
        type: 'league'
      },
      {
        id: 'Champions-League',
        title: 'UEFA Champions League',
        src: 'https://crests.football-data.org/CL.png',
        to: '/databases/cups/Champions-League',
        type: 'cup'
      },
      {
        id: 'World-Cup',
        title: 'World Cup',
        src: 'https://crests.football-data.org/qatar.png',
        to: '/databases/cups/World-Cup',
        type: 'cup'
      }
    ]

    return { competitions, lazy }
  }
})
</script>
