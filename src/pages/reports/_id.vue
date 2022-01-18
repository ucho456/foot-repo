<template>
  <v-container>
    <v-sheet>
      <v-container>
        <ReportsHeader v-bind="report" />
        <v-container>
          <v-row>
            <v-col>
              <h1 class="h1">{{ report.title }}</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3" md="1" sm="2">
              <v-avatar size="30px">
                <v-img :src="user.imageUrl" />
              </v-avatar>
            </v-col>
            <v-col class="user-name" cols="9" sm="10" md="11">{{ user.name }}</v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-row v-for="reportItem in reportItems" :key="reportItem.id">
            <v-col class="mt-5 body-1" cols="12"
              ><span :class="{ mom: report.mom === reportItem.playerName }">{{
                reportItem.playerName
              }}</span></v-col
            >
            <v-col class="mt-n6 caption" cols="12">{{ reportItem.text }}</v-col>
          </v-row>
          <v-row>
            <v-col class="mt-5 body-1" cols="12">総評</v-col>
            <v-col class="mt-n6 caption" cols="12">{{ report.summary }}</v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import ReportsHeader from '@/components/organisms/ReportsHeader.vue'

export default defineComponent({
  name: 'ReportShow',

  components: {
    ReportsHeader
  },

  setup(_, ctx) {
    const id = Number(ctx.root.$route.params.id)
    const user = {
      id: 1,
      name: '鈴木太郎',
      imageUrl: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
    }
    const report = {
      title: 'ダービーマッチ！！！',
      userId: 1,
      matchId: 1,
      competitionId: 1,
      competitionName: 'Jリーグ',
      seasonId: 1,
      seasonStartDate: '2021-12-12',
      seasonEndDate: '2022-12-12',
      utcDate: 'utcDate',
      reportTeam: 'Both teams',
      homeTeamId: 1,
      homeTeamName: 'ガンバ大阪',
      homeTeamScore: 2,
      homeTeamReportItems: [
        {
          id: 1,
          homeAway: 'home',
          playerName: 'あいうえお',
          position: 'GK',
          positionId: 1,
          shirtNumber: 1,
          point: 7,
          text: '良かった'
        }
      ],
      awayTeamId: 2,
      awayTeamName: '浦和レッズ',
      awayTeamScore: 1,
      awayTeamReportItems: [
        {
          id: 100,
          homeAway: 'away',
          playerName: 'たちつてと',
          position: 'GK',
          positionId: 1,
          shirtNumber: 1,
          point: 8,
          text: '最高'
        }
      ],
      summary: '総評だよ',
      mom: 'あいうえお'
    }
    const reportItems = report.homeTeamReportItems.concat(report.awayTeamReportItems)
    return { id, report, user, reportItems }
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
