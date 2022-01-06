<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" sm="10">
        <v-sheet>
          <ReportsNewHeader v-bind="report" />
          <v-row>
            <v-col cols="8" md="5" sm="5">
              <SelectReportFormat v-model="report.formatType" class="ml-4 mt-4" />
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api' //, useRoute
import ReportsNewHeader from '@/components/organisms/ReportsNewHeader.vue'
import SelectReportFormat from '@/components/molecules/SelectReportFormat.vue'
// import getFootballData from '@/api/getFootballData'
import { testData } from '@/utils/testData'
import { setUpReport } from '@/composables/pages/reports/new'

export default defineComponent({
  name: 'ReportNew',

  components: {
    ReportsNewHeader,
    SelectReportFormat
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
