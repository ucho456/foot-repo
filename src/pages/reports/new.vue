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
            <v-row v-for="(reportItem, index) in report.homeTeamReportItems" :key="reportItem.id">
              <ReportsNewForm
                v-bind="reportItem"
                @input-point="(point) => inputPoint(report, point, 'home', index)"
                @input-text="(text) => inputText(report, text, 'home', index)"
              />
            </v-row>
          </v-container>
          <v-container v-if="report.formatType !== 'Home team only'">
            <v-row v-for="(reportItem, index) in report.awayTeamReportItems" :key="reportItem.id">
              <ReportsNewForm
                v-bind="reportItem"
                @input-point="(point) => inputPoint(report, point, 'away', index)"
                @input-text="(text) => inputText(report, text, 'away', index)"
              />
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col cols="8" sm="5" md="5">
                <SelectMom
                  v-model="report.mom"
                  :away-team-report-items="report.awayTeamReportItems"
                  :format-type="report.formatType"
                  :home-team-report-items="report.homeTeamReportItems"
                />
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col>
                <TextareaSummary v-model="report.summary" />
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row justify="center">
              <v-col cols="4">
                <ButtonBlockWhite :icon="'mdi-arrow-left'" :text="'戻る'" @click="back" />
              </v-col>
              <v-col cols="4">
                <ButtonBlockBlue :icon="'mdi-pencil-plus'" :text="'投稿'" :loading="false" />
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api' //, useRoute
import ReportsNewHeader from '@/components/organisms/ReportsNewHeader.vue'
import SelectReportFormat from '@/components/molecules/SelectReportFormat.vue'
import ReportsNewForm from '@/components/organisms/ReportsNewForm.vue'
import SelectMom from '@/components/molecules/SelectMom.vue'
import TextareaSummary from '@/components/molecules/TextareaSummary.vue'
import ButtonBlockWhite from '@/components/molecules/ButtonBlockWhite.vue'
import ButtonBlockBlue from '@/components/molecules/ButtonBlockBlue.vue'
// import getFootballData from '@/api/getFootballData'
import { testData } from '@/utils/testData'
import { setUpReport, inputPoint, inputText } from '@/composables/pages/reports/new'

export default defineComponent({
  name: 'ReportNew',

  components: {
    ReportsNewHeader,
    SelectReportFormat,
    ReportsNewForm,
    SelectMom,
    TextareaSummary,
    ButtonBlockWhite,
    ButtonBlockBlue
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
    const router = useRouter()
    const back = () => router.back()
    return {
      // res,
      // err,
      // isLoading,
      report,
      inputPoint,
      inputText,
      back
    }
  }
})
</script>
