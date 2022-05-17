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
        <v-row>
          <v-col>
            <v-img
              class="rounded-circle"
              max-height="60"
              max-width="60"
              :src="`https://crests.football-data.org/${match.homeTeam.id}.svg`"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="report.selectTeam !== 'away'">
        <v-row v-for="reportItem in report.homeTeamReportItems" :key="reportItem.id">
          <v-col cols="2"> {{ reportItem.position }}. {{ reportItem.shirtNumber }} </v-col>
          <v-col cols="10">{{ reportItem.playerName }}</v-col>
          <v-col class="mt-n6" cols="2"><TextFieldPoint v-model="reportItem.point" /></v-col>
          <v-col class="mt-n6" cols="10">
            <Textarea v-model="reportItem.text" :maxlength="140" />
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="report.selectTeam !== 'home'">
        <v-row>
          <v-col>
            <v-img
              class="rounded-circle"
              max-height="60"
              max-width="60"
              :src="`https://crests.football-data.org/${match.awayTeam.id}.svg`"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="report.selectTeam !== 'home'">
        <v-row v-for="reportItem in report.awayTeamReportItems" :key="reportItem.id">
          <v-col cols="2"> {{ reportItem.position }}. {{ reportItem.shirtNumber }} </v-col>
          <v-col cols="10">{{ reportItem.playerName }}</v-col>
          <v-col class="mt-n6" cols="2"><TextFieldPoint v-model="reportItem.point" /></v-col>
          <v-col class="mt-n6" cols="10">
            <Textarea v-model="reportItem.text" :maxlength="140" />
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col cols="9" sm="5">
            <SelectIdMom
              v-model="report.momId"
              :away-team-report-items="report.awayTeamReportItems"
              :home-team-report-items="report.homeTeamReportItems"
              :select-team="report.selectTeam"
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
              :maxlength="140"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <!-- <v-container>
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
    </v-row>  -->
  </v-card>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api' //, useRoute
import useNew from '@/composables/reports/useNew'
import ReportsHeader from '@/components/organisms/ReportsHeader.vue'
import SelectHomeAway from '@/components/molecules/SelectHomeAway.vue'
import TextFieldPoint from '@/components/molecules/TextFieldPoint.vue'
import Textarea from '@/components/molecules/Textarea.vue'
import SelectIdMom from '@/components/molecules/SelectIdMom.vue'
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
    TextFieldPoint,
    Textarea,
    SelectIdMom
    //   Textarea,
    //   ButtonBack,
    //   ButtonSubmit
  },

  setup() {
    const route = useRoute()
    const { report, match, isLoadingSetUp, setUp } = useNew()

    const matchId = route.value.query.matchId as string
    setUp(matchId)
    // console.log(matchId)
    // const match = matches[0]
    // const user = users[0]
    // const report = setUpReport(match, user)
    // const router = useRouter()
    // const back = () => router.back()
    // return { report, back }
    return { report, match, isLoadingSetUp }
  }
})
</script>
