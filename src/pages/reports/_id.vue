<template>
  <v-card outlined>
    <v-container v-if="isLoadingSetUp" class="pb-10 pt-10">
      <v-row justify="center">
        <v-progress-circular color="primary" indeterminate />
      </v-row>
    </v-container>
    <v-container v-else>
      <ReportsHeader v-bind="match" />
      <v-container>
        <v-row>
          <v-col>
            <h1 class="h1">{{ report.title }}</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            <v-img
              v-if="report.user.imageUrl"
              class="rounded-circle"
              :height="30"
              :width="30"
              :src="report.user.imageUrl"
            />
            <v-img v-else class="rounded-circle" :height="30" :width="30" :src="noAvatarImage" />
          </v-col>
          <v-col class="ml-n4 user-name" cols="10">{{ report.user.name }}</v-col>
        </v-row>
      </v-container>
      <v-container v-if="report.selectTeam !== 'away'">
        <v-row>
          <v-col>
            <v-img
              class="rounded-circle"
              max-height="30"
              max-width="30"
              :src="`https://crests.football-data.org/${match.homeTeam.id}.svg`"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="report.selectTeam !== 'away'">
        <v-row v-for="htrItem in homeTeamReportItems" :key="htrItem.id">
          <v-col cols="12">
            {{ htrItem.position }} {{ htrItem.shirtNumber }} {{ htrItem.player.name }}
            <span v-if="report.momId === htrItem.player.id" class="mom">☆MOM</span>
          </v-col>
          <v-col class="mt-n6" cols="12"> {{ htrItem.point }} </v-col>
          <v-col class="caption mb-5 mt-n6" cols="12">{{ htrItem.text }}</v-col>
        </v-row>
      </v-container>
      <v-container v-if="report.selectTeam !== 'home'">
        <v-row>
          <v-col>
            <v-img
              class="rounded-circle"
              max-height="30"
              max-width="30"
              :src="`https://crests.football-data.org/${match.awayTeam.id}.svg`"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="report.selectTeam !== 'home'">
        <v-row v-for="atrItem in awayTeamReportItems" :key="atrItem.id">
          <v-col cols="12">
            {{ atrItem.position }} {{ atrItem.shirtNumber }} {{ atrItem.player.name }}
            <span v-if="report.momId === atrItem.player.id" class="mom">☆MOM</span>
          </v-col>
          <v-col class="mt-n6" cols="12"> {{ atrItem.point }} </v-col>
          <v-col class="caption mb-5 mt-n6" cols="12">{{ atrItem.text }}</v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col cols="12">総評：{{ report.summary }}</v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import useShow from '@/composables/reports/useShow'
import useSnackbar from '@/utils/useSnackbar'
import ReportsHeader from '@/components/organisms/ReportsHeader.vue'

export default defineComponent({
  name: 'ReportShow',

  components: {
    ReportsHeader
  },

  setup() {
    const route = useRoute()
    const { report, homeTeamReportItems, awayTeamReportItems, match, isLoadingSetUp, setUp } =
      useShow()
    const { openSnackbar } = useSnackbar()
    const noAvatarImage = require('@/assets/no_avatar.png')

    const setUpPage = async () => {
      const reportId = route.value.query.reportId as string
      const result = await setUp(reportId)
      if (result === 'failure') {
        openSnackbar(result, '選手採点データの取得に失敗しました。')
      }
    }
    setUpPage()

    return {
      report,
      homeTeamReportItems,
      awayTeamReportItems,
      match,
      isLoadingSetUp,
      noAvatarImage
    }
  }
})
</script>

<style lang="scss" scoped>
.user-name {
  line-height: 30px;
}
.mom {
  background: linear-gradient(transparent 70%, yellow 70%);
}
@media (max-width: $tabletBreakpoints) {
  h1 {
    font-size: 20px;
  }
}
</style>
