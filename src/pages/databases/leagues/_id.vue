<template>
  <v-container>
    <v-card outlined>
      <v-container>
        <v-row>
          <v-col>
            <h1>{{ league.name }}</h1>
          </v-col>
        </v-row>
      </v-container>
      <ContainerLoading :is-loading="isLoadingStandings" />
      <v-container v-if="league.standings">
        <h2>順位表</h2>
        <v-simple-table dence>
          <template #default>
            <thead>
              <tr>
                <th class="text-center">Rank</th>
                <th></th>
                <th class="text-center">Team</th>
                <th class="text-center">Played</th>
                <th class="text-center">Won</th>
                <th class="text-center">Lost</th>
                <th class="text-center">Draw</th>
                <th class="text-center">Points</th>
                <th class="text-center">Last 5</th>
                <th class="text-center">Goals</th>
                <th class="text-center">Conceded</th>
                <th class="text-center">Goal diff</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in league.standings.table"
                :key="item.keyId"
                class="standings"
                @click="pushToTeamShow(item.team.ref.path)"
              >
                <td class="text-center">{{ item.rank }}</td>
                <td class="text-center">
                  <v-img
                    v-if="item.team.imageUrl"
                    :height="30"
                    :width="30"
                    :src="item.team.imageUrl"
                  />
                </td>
                <td class="text-center">{{ item.team.name }}</td>
                <td class="text-center">{{ item.playedGames }}</td>
                <td class="text-center">{{ item.won }}</td>
                <td class="text-center">{{ item.lost }}</td>
                <td class="text-center">{{ item.draw }}</td>
                <td class="text-center">{{ item.points }}</td>
                <td class="text-center">{{ item.form }}</td>
                <td class="text-center">{{ item.goalsFor }}</td>
                <td class="text-center">{{ item.goalsAgainst }}</td>
                <td class="text-center">{{ item.goalsDifference }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
    </v-card>
    <v-card v-if="!isLoadingStandings" class="mt-4" outlined>
      <ContainerLoading :is-loading="isLoadingScorers" />
      <v-container v-if="league.scorers">
        <h2>得点ランキング</h2>
        <v-simple-table dense>
          <template #default>
            <thead>
              <tr class="no-link">
                <th class="text-center">Rank</th>
                <th class="text-center">Player</th>
                <th class="text-center">Team</th>
                <th class="text-center">Goals</th>
                <th class="text-center">Assists</th>
                <th class="text-center">Penalties</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in league.scorers.table" :key="item.keyId" class="no-link">
                <td class="text-center">{{ item.rank }}</td>
                <td class="text-center">{{ item.playerName }}</td>
                <td class="text-center">{{ item.teamName }}</td>
                <td class="text-center">{{ item.goals }}</td>
                <td class="text-center">{{ item.assists }}</td>
                <td class="text-center">{{ item.penalties }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
    </v-card>
    <v-card v-if="!isLoadingStandings && !isLoadingScorers" class="mt-4" outlined>
      <MatchSchedule
        v-if="!isLoadingScorers && !isLoadingStandings"
        v-model="league.yearMonth"
        :is-loading="isLoadingMatches"
        :match-schedule="league.matchSchedule"
        @click="searchMatchSchedule"
      />
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, useRoute, useRouter } from '@nuxtjs/composition-api'
import useShow from '@/composables/databases/leagues/useShow'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import MatchSchedule from '@/components/organisms/MatchSchedule.vue'

export default defineComponent({
  name: 'LeagueShow',

  components: {
    ContainerLoading,
    MatchSchedule
  },

  setup() {
    const route = useRoute()
    const router = useRouter()
    const { isLoadingStandings, isLoadingScorers, isLoadingMatches, setUp, search } = useShow()
    const { openSnackbar } = useSnackbar()
    const { league } = useStore()

    const setUpPage = async (): Promise<void> => {
      const competitionId = route.value.params.id as string
      if (league.competitionId !== competitionId) {
        const result = await setUp(competitionId)
        if (result === 'failure') {
          openSnackbar(result, 'データの取得に失敗しました。')
        }
      }
    }
    setUpPage()

    const pushToTeamShow = (path: string): void => {
      router.push(`/databases/${path}`)
    }

    const searchMatchSchedule = async (): Promise<void> => {
      const result = await search()
      if (result === 'failure') {
        openSnackbar(result, 'データの取得に失敗しました。')
      }
    }

    return {
      isLoadingStandings,
      isLoadingScorers,
      isLoadingMatches,
      league,
      searchMatchSchedule,
      pushToTeamShow
    }
  }
})
</script>

<style lang="scss" scoped>
.standings {
  &:hover {
    cursor: pointer;
  }
}
.no-link {
  &:hover {
    background-color: transparent !important;
  }
}
</style>
