<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" sm="10">
        <v-sheet>
          <ReportsNewHeader v-bind="report" />
          <v-container>
            <v-row>
              <v-col cols="8" md="5" sm="5">
                <SelectReportFormat v-model="report.formatType" class="ml-4 mt-4" />
              </v-col>
            </v-row>
          </v-container>
          <v-container v-if="report.formatType !== 'Away team only'">
            <v-row v-for="reportItem in report.homeTeamReportItems" :key="reportItem.key">
              <ReportsNewForm v-bind="reportItem" />
            </v-row>
          </v-container>
          <v-container v-if="report.formatType !== 'Home team only'">
            <v-row v-for="reportItem in report.awayTeamReportItems" :key="reportItem.key">
              <ReportsNewForm v-bind="reportItem" />
            </v-row>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api' //, useRoute
import ReportsNewHeader from '@/components/organisms/ReportsNewHeader.vue'
import SelectReportFormat from '@/components/molecules/SelectReportFormat.vue'
import ReportsNewForm from '@/components/organisms/ReportsNewForm.vue'
// import getFootballData from '@/api/getFootballData'
import { testData } from '@/utils/testData'
import { setUpReport } from '@/composables/pages/reports/new'

export default defineComponent({
  name: 'ReportNew',

  components: {
    ReportsNewHeader,
    SelectReportFormat,
    ReportsNewForm
  },

  layout: 'noside',

  setup() {
    /*
      有料プラン契約後に実装
      const { res, err, isLoading, getMatches } = getFootballData()
      const route = useRoute()
      getMatches(`/matches/${route.value.query.matchId}`)
    */
    const match = testData.match as Match
    const report = setUpReport(match)
    return {
      // res,
      // err,
      // isLoading,
      report
    }
  }
})
</script>
