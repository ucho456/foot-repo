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
          <v-col cols="8" md="5" sm="5">
            <SelectHomeAway v-model="report.selectTeam" />
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="report.selectTeam !== 'away'">
        <v-row v-for="(reportItem, index) in report.homeTeamReportItems" :key="reportItem.id">
          <ReportsPlayerForm
            v-bind="reportItem"
            @input-point="(point) => inputPoint(point, 'home', index)"
            @input-text="(text) => inputText(text, 'home', index)"
          />
        </v-row>
      </v-container>
    </v-container>
    <!-- <v-row justify="center">
      <v-col cols="12" md="6" sm="10">
        <v-sheet>
          <ReportsHeader v-bind="report" />
          <v-container>
            
          </v-container>
          <v-container v-if="report.selectTeam !== 'Away team only'">
            <v-row v-for="(reportItem, index) in report.homeTeamReportItems" :key="reportItem.id">
              <ReportsPlayerForm
                v-bind="reportItem"
                @input-point="(point) => inputPoint(report, point, 'home', index)"
                @input-text="(text) => inputText(report, text, 'home', index)"
              />
            </v-row>
          </v-container>
          <v-container v-if="report.selectTeam !== 'Home team only'">
            <v-row v-for="(reportItem, index) in report.awayTeamReportItems" :key="reportItem.id">
              <ReportsPlayerForm
                v-bind="reportItem"
                @input-point="(point) => inputPoint(report, point, 'away', index)"
                @input-text="(text) => inputText(report, text, 'away', index)"
              />
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col cols="9" sm="5" md="6">
                <SelectIdMom
                  v-model="report.momId"
                  :away-team-report-items="report.awayTeamReportItems"
                  :report-team="report.selectTeam"
                  :home-team-report-items="report.homeTeamReportItems"
                />
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col>
                <Textarea
                  v-model="report.summary"
                  :icon="'mdi-note-text-outline'"
                  :label="'総評'"
                />
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row justify="center">
              <v-col cols="4">
                <ButtonBack @click="back" />
              </v-col>
              <v-col cols="4">
                <ButtonSubmit :icon="'mdi-pencil-plus'" :text="'投稿'" :loading="false" />
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row> -->
  </v-card>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api' //, useRoute
import useNew from '@/composables/reports/useNew'
import ReportsHeader from '@/components/organisms/ReportsHeader.vue'
import SelectHomeAway from '@/components/molecules/SelectHomeAway.vue'
import ReportsPlayerForm from '@/components/organisms/ReportsPlayerForm.vue'
// import SelectIdMom from '@/components/molecules/SelectIdMom.vue'
// import Textarea from '@/components/molecules/Textarea.vue'
// import ButtonBack from '@/components/molecules/ButtonBack.vue'
// import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
// import { matches, users } from '@/utils/testData'
// import { setUpReport, inputPoint, inputText } from '@/composables/useReportsNew'

export default defineComponent({
  name: 'ReportNew',

  components: {
    ReportsHeader,
    SelectHomeAway,
    ReportsPlayerForm
    //   SelectIdMom,
    //   Textarea,
    //   ButtonBack,
    //   ButtonSubmit
  },

  setup() {
    const route = useRoute()
    const { report, match, isLoadingSetUp, setUp, inputPoint, inputText } = useNew()

    const matchId = route.value.query.matchId as string
    setUp(matchId)
    // console.log(matchId)
    // const match = matches[0]
    // const user = users[0]
    // const report = setUpReport(match, user)
    // const router = useRouter()
    // const back = () => router.back()
    // return { report, inputPoint, inputText, back }
    return { report, match, isLoadingSetUp, inputPoint, inputText }
  }
})
</script>
