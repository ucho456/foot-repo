<template>
  <v-container>
    <v-card outlined>
      <ContainerLoading :is-loading="isLoadingMatch" />
      <v-container v-if="match.data && !isLoadingMatch">
        <RowMatchHeader v-bind="match.data" />
      </v-container>
      <v-container v-if="match.data && match.detail && !isLoadingMatch">
        <v-row>
          <v-col cols="12" sm="6">
            <div class="d-flex">
              <v-img
                class="mt-3 mr-3"
                height="30"
                width="30"
                :lazy-src="lazy"
                :src="match.data.homeTeam.imageUrl"
              />
              <v-tabs v-model="homeTab" fixed-tabs>
                <v-tab>スタメン</v-tab>
                <v-tab>ベンチ</v-tab>
              </v-tabs>
            </div>
            <v-simple-table dence>
              <template #default>
                <tbody>
                  <tr v-for="player in homePlayers" :key="player.player.id" class="o-no-link">
                    <td class="text-center">{{ player.position }}</td>
                    <td class="text-center">{{ player.shirtNumber }}</td>
                    <td class="text-center">{{ player.player.name }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="d-flex">
              <v-img
                class="mt-3 mr-3"
                height="30"
                width="30"
                :lazy-src="lazy"
                :src="match.data.awayTeam.imageUrl"
              />
              <v-tabs v-model="awayTab" fixed-tabs>
                <v-tab>スタメン</v-tab>
                <v-tab>ベンチ</v-tab>
              </v-tabs>
            </div>
            <v-simple-table dence>
              <template #default>
                <tbody>
                  <tr v-for="player in awayPlayers" :key="player.player.id" class="o-no-link">
                    <td class="text-center">{{ player.position }}</td>
                    <td class="text-center">{{ player.shirtNumber }}</td>
                    <td class="text-center">{{ player.player.name }}</td>
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
              <tr class="o-no-link">
                <th class="text-center">min</th>
                <th class="text-center">team</th>
                <th class="text-center">scorer</th>
                <th class="text-center">assist</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in match.detail.goals" :key="item.keyId" class="o-no-link">
                <td class="text-center">{{ item.minute }}</td>
                <td class="text-center">{{ item.team.name }}</td>
                <td class="text-center">{{ item.scorer.name }}</td>
                <td class="text-center">{{ item.assist ? item.assist.name : '' }}</td>
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
              <tr class="o-no-link">
                <th class="text-center">min</th>
                <th class="text-center">team</th>
                <th class="text-center">in</th>
                <th class="text-center">out</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in match.detail.substitutions" :key="item.keyId" class="o-no-link">
                <td class="text-center">{{ item.minute }}</td>
                <td class="text-center">{{ item.team.name }}</td>
                <td class="text-center">{{ item.inPlayer.name }}</td>
                <td class="text-center">{{ item.outPlayer.name }}</td>
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
              <tr class="o-no-link">
                <th class="text-center">min</th>
                <th class="text-center">team</th>
                <th class="text-center">player</th>
                <th class="text-center">card</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in match.detail.bookings" :key="item.keyId" class="o-no-link">
                <td class="text-center">{{ item.minute }}</td>
                <td class="text-center">{{ item.team.name }}</td>
                <td class="text-center">{{ item.player.name }}</td>
                <td class="text-center">
                  <div
                    class="o-card"
                    :class="{
                      'o-yellow': item.card === 'yellow',
                      'o-red': item.card === 'red'
                    }"
                  ></div>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
    </v-card>
    <v-card class="mt-4" outlined>
      <v-container>
        <v-row justify="center">
          <v-col cols="10" md="6">
            <ButtonOutlined :text="'同試合の選手採点を投稿する'" @click="pushToReportNew" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card v-if="!isLoadingMatch && match.data && match.detail" class="mt-4" outlined>
      <ContainerLoading :is-loading="isLoadingSameMatchReports" />
      <ContainerReportTable :h2="'同試合の選手採点'" :reports="match.reports" />
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, useRoute, useRouter } from '@nuxtjs/composition-api'
import useShow from '@/composables/databases/matches/useShow'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import RowMatchHeader from '@/components/organisms/RowMatchHeader.vue'
import ButtonOutlined from '@/components/molecules/ButtonOutlined.vue'
import ContainerReportTable from '@/components/organisms/ContainerReportTable.vue'

export default defineComponent({
  name: 'MatchShow',

  components: {
    ContainerLoading,
    RowMatchHeader,
    ButtonOutlined,
    ContainerReportTable
  },

  setup() {
    const route = useRoute()
    const router = useRouter()
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
    const lazy = require('@/assets/lazy.png')

    const matchId = route.value.params.id as string
    const setUpPage = async (): Promise<void> => {
      if (!match.data || (match.data && match.data.id !== matchId)) {
        const result = await setUp(matchId)
        if (result === 'failure') {
          openSnackbar(result, 'データの取得に失敗しました。')
        }
      }
    }
    setUpPage()

    const pushToReportNew = (): void => {
      router.push(`/reports/new?matchId=${matchId}`)
    }

    return {
      isLoadingMatch,
      isLoadingSameMatchReports,
      match,
      homeTab,
      homePlayers,
      awayTab,
      awayPlayers,
      pushToReportNew,
      lazy
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
.o-no-link {
  &:hover {
    background-color: transparent !important;
  }
}
.o-card {
  margin: 0 auto;
  height: 28px;
  width: 20px;
  border-radius: 3px;
}
.o-yellow {
  background: #ffd600;
}
.o-red {
  background: red;
}
</style>
