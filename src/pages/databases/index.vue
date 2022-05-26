<template>
  <v-card outlined>
    <v-container fluid>
      <v-row dense>
        <v-col v-for="card in cards" :key="card.title" cols="6" sm="4">
          <v-card @click="pushToCompetitionShow(card.to)">
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
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import useStore from '@/utils/useStore'

export default defineComponent({
  name: 'Databases',

  setup() {
    const router = useRouter()
    const { resetDatabases } = useStore()

    const cards = [
      { title: 'J. League', src: require('@/assets/JJL.jpg'), to: '/databases/leagues/J-League' },
      {
        title: 'Premier League',
        src: require('@/assets/PL.png'),
        to: '/databases/leagues/Premier-League'
      },
      { title: 'La Liga', src: require('@/assets/PD.png'), to: '/databases/leagues/La-Liga' },
      { title: 'Serie A', src: require('@/assets/SA.png'), to: '/databases/leagues/Serie-A' },
      { title: 'Bundesliga', src: require('@/assets/BL1.png'), to: '/databases/leagues/Bundesliga' }
    ]

    const pushToCompetitionShow = (to: string): void => {
      resetDatabases()
      router.push(to)
    }

    return { cards, pushToCompetitionShow }
  }
})
</script>

<style lang="scss" scoped>
.text-center {
  text-align: center;
}
</style>
