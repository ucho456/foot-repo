<template>
  <v-container>
    <v-card min-height="600" outlined>
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
                class="o-standings"
                @click="pushToTeamShow(item.team.ref.path)"
              >
                <td class="text-center">{{ item.rank }}</td>
                <td class="text-center">
                  <v-img
                    v-if="item.team.imageUrl"
                    height="30"
                    width="30"
                    :lazy-src="lazy"
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
              <tr class="o-no-link">
                <th class="text-center">Rank</th>
                <th class="text-center">Player</th>
                <th class="text-center">Team</th>
                <th class="text-center">Goals</th>
                <th class="text-center">Assists</th>
                <th class="text-center">Penalties</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in league.scorers.table" :key="item.keyId" class="o-no-link">
                <td class="text-center">{{ item.rank }}</td>
                <td class="text-center">{{ item.player.name }}</td>
                <td class="text-center">{{ item.team.name }}</td>
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
        @click="readMatchSchedule"
      />
      <v-container>
        <v-row justify="center">
          <v-col cols="10">
            <ButtonSubmit
              :disabled="!league.hasNext"
              :is-loading="isLoadingNextMatchSchedule"
              :text="'もっと読み込む'"
              @click="readNextMatchSchedule"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
/** check */
import { defineComponent } from '@nuxtjs/composition-api'
import useShow from '@/composables/databases/leagues/useShow'
import useStore from '@/utils/useStore'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import MatchSchedule from '@/components/organisms/MatchSchedule.vue'

export default defineComponent({
  name: 'LeagueShow',

  components: {
    ButtonSubmit,
    ContainerLoading,
    MatchSchedule
  },

  setup() {
    const {
      isLoadingMatches,
      isLoadingNextMatchSchedule,
      isLoadingScorers,
      isLoadingStandings,
      pushToTeamShow,
      readMatchSchedule,
      readNextMatchSchedule,
      setUp
    } = useShow()
    const { league } = useStore()
    const lazy = require('@/assets/lazy.png')

    setUp()

    return {
      isLoadingMatches,
      isLoadingNextMatchSchedule,
      isLoadingScorers,
      isLoadingStandings,
      lazy,
      league,
      pushToTeamShow,
      readMatchSchedule,
      readNextMatchSchedule
    }
  },

  head() {
    return {
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }
})
</script>

<style lang="scss" scoped>
.o-standings {
  &:hover {
    cursor: pointer;
  }
}
.o-no-link {
  &:hover {
    background-color: transparent !important;
  }
}
</style>
