<template>
  <v-container>
    <v-card outlined>
      <ContainerLoading :is-loading="isLoadingMatch" />
      <v-container v-if="match.data">
        <RowMatchHeader v-bind="match.data" />
      </v-container>
      <v-container v-if="match.data && match.detail">
        <v-row>
          <v-col cols="12" sm="6">
            <div class="d-flex">
              <v-img class="mt-3 mr-3" height="30" width="30" :src="match.data.homeTeam.imageUrl" />
              <v-tabs v-model="homeTab" fixed-tabs>
                <v-tab>スタメン</v-tab>
                <v-tab>ベンチ</v-tab>
              </v-tabs>
            </div>
            <v-simple-table dence>
              <template #default>
                <tbody>
                  <tr v-for="player in homePlayers" :key="player.id" class="no-link">
                    <td class="text-center">{{ player.position }}</td>
                    <td class="text-center">{{ player.shirtNumber }}</td>
                    <td class="text-center">{{ player.name }}</td>
                  </tr>
                  <tr>
                    <td class="text-center">HC</td>
                    <td></td>
                    <td class="text-center">{{ match.detail.homeCoachName }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="d-flex">
              <v-img class="mt-3 mr-3" height="30" width="30" :src="match.data.awayTeam.imageUrl" />
              <v-tabs v-model="awayTab" fixed-tabs>
                <v-tab>スタメン</v-tab>
                <v-tab>ベンチ</v-tab>
              </v-tabs>
            </div>
            <v-simple-table dence>
              <template #default>
                <tbody>
                  <tr v-for="player in awayPlayers" :key="player.id" class="no-link">
                    <td class="text-center">{{ player.position }}</td>
                    <td class="text-center">{{ player.shirtNumber }}</td>
                    <td class="text-center">{{ player.name }}</td>
                  </tr>
                  <tr>
                    <td class="text-center">HC</td>
                    <td></td>
                    <td class="text-center">{{ match.detail.awayCoachName }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card v-if="match.detail" class="mt-4" outlined>
      <v-container>
        <h3>ゴール</h3>
        <v-simple-table dense>
          <template #default>
            <thead>
              <tr class="no-link">
                <th class="text-center">min</th>
                <th class="text-center">team</th>
                <th class="text-center">scorer</th>
                <th class="text-center">assist</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in match.detail.goals" :key="item.keyId" class="no-link">
                <td class="text-center">{{ item.minute }}</td>
                <td class="text-center">{{ item.teamName }}</td>
                <td class="text-center">{{ item.goalPlayerName }}</td>
                <td class="text-center">{{ item.assistPlayerName }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
    </v-card>
    <v-card v-if="match.detail" class="mt-4" outlined>
      <v-container>
        <h3>選手交代</h3>
        <v-simple-table dense>
          <template #default>
            <thead>
              <tr class="no-link">
                <th class="text-center">min</th>
                <th class="text-center">team</th>
                <th class="text-center">in</th>
                <th class="text-center">out</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in match.detail.substitutions" :key="item.keyId" class="no-link">
                <td class="text-center">{{ item.minute }}</td>
                <td class="text-center">{{ item.teamName }}</td>
                <td class="text-center">{{ item.inPlayerName }}</td>
                <td class="text-center">{{ item.outPlayerName }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
    </v-card>
    <v-card v-if="match.detail" class="mt-4" outlined>
      <v-container>
        <h3>カード</h3>
        <v-simple-table dense>
          <template #default>
            <thead>
              <tr class="no-link">
                <th class="text-center">min</th>
                <th class="text-center">team</th>
                <th class="text-center">player</th>
                <th class="text-center">card</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in match.detail.bookings" :key="item.keyId" class="no-link">
                <td class="text-center">{{ item.minute }}</td>
                <td class="text-center">{{ item.teamName }}</td>
                <td class="text-center">{{ item.playerName }}</td>
                <td class="text-center">
                  <div
                    :class="{
                      'yellow-card': item.card === 'yellow',
                      'red-card': item.card === 'red'
                    }"
                  ></div>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
    </v-card>
    <v-card v-if="!isLoadingMatch && match.data && match.detail" class="mt-4" outlined>
      <ContainerLoading :is-loading="isLoadingSameMatchReports" />
      <ContainerReportTable :h2="'同じ試合の選手採点'" :reports="match.reports" />
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import useShow from '@/composables/databases/matches/useShow'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import RowMatchHeader from '@/components/organisms/RowMatchHeader.vue'
import ContainerReportTable from '@/components/organisms/ContainerReportTable.vue'

export default defineComponent({
  name: 'MatchShow',

  components: {
    ContainerLoading,
    RowMatchHeader,
    ContainerReportTable
  },

  setup() {
    const route = useRoute()
    const {
      isLoadingMatch,
      isLoadingSameMatchReports,
      setUp,
      homeTab,
      homePlayers,
      awayTab,
      awayPlayers
    } = useShow()
    const { openSnackbar } = useSnackbar()
    const { match } = useStore()

    const setUpPage = async () => {
      const matchId = route.value.params.id as string
      if (!match.data || (match.data && match.data.id !== matchId)) {
        const result = await setUp(matchId)
        if (result === 'failure') {
          openSnackbar(result, 'データの取得に失敗しました。')
        }
      }
    }
    setUpPage()

    return {
      isLoadingMatch,
      isLoadingSameMatchReports,
      match,
      homeTab,
      homePlayers,
      awayTab,
      awayPlayers
    }
  }
})
</script>

<style lang="scss" scoped>
.no-link {
  &:hover {
    background-color: transparent !important;
  }
}
.yellow-card {
  margin: 0 auto;
  height: 28px;
  width: 20px;
  background: #ffd600;
  border-radius: 3px;
}
.red-card {
  margin: 0 auto;
  height: 28px;
  width: 20px;
  background: red;
  border-radius: 3px;
}
</style>
