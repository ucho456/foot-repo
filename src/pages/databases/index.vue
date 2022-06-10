<template>
  <v-container>
    <v-card outlined>
      <v-container fluid>
        <v-row dense>
          <v-col v-for="competition in competitions" :key="competition.title" cols="6" sm="4">
            <v-card @click="pushToCompetitionShow(competition)">
              <v-img :src="competition.src" />
              <v-card-text class="font-weight-bold text-center">
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
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import useStore from '@/utils/useStore'

export default defineComponent({
  name: 'Databases',

  setup() {
    const router = useRouter()
    const { league, resetLeague } = useStore()

    const competitions: {
      id: string
      title: string
      src: string
      to: string
      type: CompetitionType
    }[] = [
      {
        id: 'J-League',
        title: 'J. League',
        src: require('@/assets/JJL.jpg') as string,
        to: '/databases/leagues/J-League',
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
      }
    ]

    const pushToCompetitionShow = (competition: {
      id: string
      to: string
      type: CompetitionType
    }): void => {
      if (competition.type === 'league' && league.competitionId !== competition.id) {
        resetLeague()
      }
      router.push(competition.to)
    }

    return { competitions, pushToCompetitionShow }
  }
})
</script>
