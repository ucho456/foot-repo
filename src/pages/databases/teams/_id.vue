<template>
  <v-card outlined>
    <ContainerLoading v-if="isLoading" />
    <v-container v-if="team.data">
      <v-row>
        <v-col cols="2">
          <v-img class="rounded-circle logo" :src="team.data.imageUrl" />
        </v-col>
        <v-col cols="10">
          <h1>{{ team.data.name }}</h1>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="team.data">
      <v-row>
        <v-col cols="8">スタジアム：{{ team.data.venue }}</v-col>
        <v-col cols="4" class="text-right">
          <a :href="team.data.website" target="_blank">公式サイト</a>
        </v-col>
      </v-row>
      <v-row></v-row>
    </v-container>
    <v-container v-if="team.data">
      <h2>コンペティション</h2>
      <v-simple-table class="table" dence>
        <template #default>
          <tbody>
            <tr v-for="competition in team.data.competitions" :key="competition.name">
              <td class="text-center">
                <v-img
                  v-if="competition.imageUrl"
                  class="rounded-circle"
                  :height="40"
                  :width="40"
                  :src="competition.imageUrl"
                />
              </td>
              <td class="text-center">{{ competition.name }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
    <v-container v-if="team.data">
      <h2>選手一覧</h2>
      <v-simple-table class="table" dence>
        <template #default>
          <tbody>
            <tr v-for="player in team.data.squad" :key="player.shirtNumber">
              <td class="text-center pl-1 pr-1">{{ player.position }}</td>
              <td class="text-center pl-1 pr-1">{{ player.shirtNumber }}</td>
              <td class="text-center">{{ player.playerName }}</td>
              <td class="text-center">{{ player.nationality }}</td>
              <td class="text-center pl-1 pr-1" style="width: 50px">
                {{ getAge(player.dateOfBirth) }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
    <ContainerLastUpdated v-if="team.data" :last-updated="team.data.lastUpdated" />
  </v-card>
</template>

<script lang="ts">
// squadにkeyId
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import useShow from '@/composables/databases/teams/useShow'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'
import ContainerLoading from '@/components/molecules/ContainerLoading.vue'
import ContainerLastUpdated from '@/components/molecules/ContainerLastUpdated.vue'

export default defineComponent({
  name: 'TeamShow',

  components: {
    ContainerLoading,
    ContainerLastUpdated
  },

  setup() {
    const route = useRoute()
    const { isLoading, setUp, getAge } = useShow()
    const { openSnackbar } = useSnackbar()
    const { team } = useStore()

    const setUpPage = async (): Promise<void> => {
      const teamId = route.value.params.id as string
      if (!team.data || (team.data && team.data.id !== teamId)) {
        const result = await setUp(teamId)
        if (result === 'failure') {
          openSnackbar(result, 'データの取得に失敗しました。')
        }
      }
    }
    setUpPage()

    return { isLoading, getAge, team }
  }
})
</script>

<style lang="scss" scoped>
.table {
  pointer-events: none;
}
.logo {
  width: 53px;
  height: 53px;
  margin: 0 auto;
}
@media (max-width: $tabletBreakPoints) {
  .logo {
    top: 5px;
    width: 35px;
    height: 35px;
  }
}
</style>
