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
                  <tr v-for="player in homePlayers" :key="player.id">
                    <td class="text-center">{{ player.position }}</td>
                    <td class="text-center">{{ player.shirtNumber }}</td>
                    <td class="text-center">{{ player.name }}</td>
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
                  <tr v-for="player in awayPlayers" :key="player.id">
                    <td class="text-center">{{ player.position }}</td>
                    <td class="text-center">{{ player.shirtNumber }}</td>
                    <td class="text-center">{{ player.name }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-container>
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

export default defineComponent({
  name: 'MatchShow',

  components: {
    ContainerLoading,
    RowMatchHeader
  },

  setup() {
    const route = useRoute()
    const { isLoadingMatch, setUp, homeTab, homePlayers, awayTab, awayPlayers } = useShow()
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

    return { isLoadingMatch, match, homeTab, homePlayers, awayTab, awayPlayers }
  }
})
</script>
