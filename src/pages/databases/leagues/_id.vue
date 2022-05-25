<template>
  <v-card outlined>
    <v-container v-if="isLoadingStandings && !standings" class="pb-10 pt-10">
      <v-row justify="center">
        <v-progress-circular color="primary" indeterminate />
      </v-row>
    </v-container>
    <v-container v-else>
      <h3>順位表</h3>
      <v-simple-table>
        <template #default>
          <thead>
            <tr>
              <th class="text-center">順位</th>
              <th class="text-center">チーム</th>
              <th class="text-center">試合数</th>
              <th class="text-center">勝</th>
              <th class="text-center">負</th>
              <th class="text-center">分</th>
              <th class="text-center">勝点</th>
              <th class="text-center">得点</th>
              <th class="text-center">失点</th>
              <th class="text-center">得失差</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in standings.table"
              :key="item.team.ref.path"
              @click="pushToTeamShow(item.team.ref.path)"
            >
              <td class="text-center">{{ item.position }}</td>
              <td class="text-center">{{ item.team.name }}</td>
              <td class="text-center">{{ item.playedGames }}</td>
              <td class="text-center">{{ item.won }}</td>
              <td class="text-center">{{ item.lost }}</td>
              <td class="text-center">{{ item.draw }}</td>
              <td class="text-center">{{ item.points }}</td>
              <td class="text-center">{{ item.goalsFor }}</td>
              <td class="text-center">{{ item.goalsAgainst }}</td>
              <td class="text-center">{{ item.goalsDifference }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
    <v-container v-if="isLoadingScorers && !scorers" class="pb-10 pt-10">
      <v-row justify="center">
        <v-progress-circular color="primary" indeterminate />
      </v-row>
    </v-container>
    <v-container v-else-if="!scorers" />
    <v-container v-else>
      <div>得点ランキング</div>
      <v-simple-table>
        <template #default>
          <thead>
            <tr>
              <th class="text-center">選手</th>
              <th class="text-center">所属</th>
              <th class="text-center">得点</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in scorers.table" :key="i">
              <td class="text-center">{{ item.playerName }}</td>
              <td class="text-center">{{ item.teamName }}</td>
              <td class="text-center">{{ item.goals }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, useRoute, useRouter } from '@nuxtjs/composition-api'
import useShow from '@/composables/databases/leagues/useShow'
import useSnackbar from '@/utils/useSnackbar'

export default defineComponent({
  name: 'LeagueShow',

  components: {},

  setup() {
    const route = useRoute()
    const router = useRouter()
    const { standings, scorers, season, isLoadingStandings, isLoadingScorers, setUp } = useShow()
    const { openSnackbar } = useSnackbar()
    const competitionId = route.value.params.id as string

    const setUpPage = async () => {
      const result = await setUp(competitionId)
      if (result === 'failure') {
        openSnackbar(result, 'データの取得に失敗しました。')
      }
    }
    setUpPage()

    const pushToTeamShow = (path: string): void => {
      router.push(`/databases/${path}`)
    }

    return { standings, scorers, season, isLoadingStandings, isLoadingScorers, pushToTeamShow }
  }
})
</script>

<style lang="scss" scoped>
tr {
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
}
@media (max-width: $tableBreakPoints) {
  th {
    writing-mode: vertical-rl;
    letter-spacing: 1px;
  }
}
</style>
