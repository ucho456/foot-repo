<template>
  <v-container>
    <v-sheet>
      <v-container>
        <ReportsHeader v-bind="report" />
        <ReportsShowBody
          :report-items="reportItems"
          :summary="report.summary"
          :title="report.title"
          :user="user"
        />
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import ReportsHeader from '@/components/organisms/ReportsHeader.vue'
import ReportsShowBody from '@/components/organisms/ReportsShowBody.vue'
import { setUpReportItems } from '@/composables/useReportsShow'

export default defineComponent({
  name: 'ReportShow',

  components: {
    ReportsHeader,
    ReportsShowBody
  },

  setup(_, ctx) {
    const id = Number(ctx.root.$route.params.id)
    const user = {
      id: 1,
      name: '鈴木太郎',
      imageUrl: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
    } as User
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
        },
        {
          id: 2,
          homeAway: 'home',
          playerName: 'かきくけこ',
          position: 'DF',
          positionId: 2,
          shirtNumber: 2,
          point: 7,
          text: '良かった'
        },
        {
          id: 3,
          homeAway: 'home',
          playerName: 'さしすせそ',
          position: 'MF',
          positionId: 3,
          shirtNumber: 3,
          point: 7,
          text: '良かった'
        },
        {
          id: 4,
          homeAway: 'home',
          playerName: 'たちつてと',
          position: 'FW',
          positionId: 4,
          shirtNumber: 4,
          point: 7,
          text: '良かった'
        },
        {
          id: 5,
          homeAway: 'home',
          playerName: 'なにぬねの',
          position: 'HC',
          positionId: 5,
          shirtNumber: 5,
          point: 7,
          text: '良かった'
        }
      ],
      awayTeamId: 2,
      awayTeamName: '浦和レッズ',
      awayTeamScore: 1,
      awayTeamReportItems: [
        {
          id: 101,
          homeAway: 'away',
          playerName: 'はひふへほ',
          position: 'GK',
          positionId: 1,
          shirtNumber: 1,
          point: 7,
          text: '良かった'
        },
        {
          id: 102,
          homeAway: 'away',
          playerName: 'かきくけこ',
          position: 'DF',
          positionId: 2,
          shirtNumber: 2,
          point: 7,
          text: '良かった'
        },
        {
          id: 103,
          homeAway: 'away',
          playerName: 'さしすせそ',
          position: 'MF',
          positionId: 3,
          shirtNumber: 3,
          point: 7,
          text: '良かった'
        },
        {
          id: 104,
          homeAway: 'away',
          playerName: 'たちつてと',
          position: 'FW',
          positionId: 4,
          shirtNumber: 4,
          point: 7,
          text: '良かった'
        },
        {
          id: 105,
          homeAway: 'away',
          playerName: 'なにぬねの',
          position: 'HC',
          positionId: 5,
          shirtNumber: 5,
          point: 7,
          text: '良かった'
        }
      ],
      summary: '総評だよ',
      mom: 'はひふへほ'
    } as Report
    const reportItems = setUpReportItems(report)
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
