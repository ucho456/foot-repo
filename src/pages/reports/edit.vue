<template>
  <v-container>
    <v-card min-height="600" outlined>
      <ContainerLoading :is-loading="isLoadingSetUp" />
      <v-container v-if="!isLoadingSetUp && match">
        <RowMatchHeader v-bind="match" />
        <v-row>
          <v-col>
            <TextField v-model="editReport.title" :label="'タイトル'" :maxlength="100" />
          </v-col>
        </v-row>
        <v-row v-if="editReport.selectTeam !== 'away'">
          <v-col>
            <v-img max-height="30" max-width="30" :lazy-src="lazy" :src="match.homeTeam.imageUrl" />
          </v-col>
        </v-row>
        <div v-if="editReport.selectTeam !== 'away'">
          <v-row v-for="reportItem in editReport.homeTeamReportItems" :key="reportItem.id">
            <v-col cols="3"> {{ reportItem.position }}. {{ reportItem.shirtNumber }} </v-col>
            <v-col cols="9">{{ reportItem.player.name }}</v-col>
            <v-col class="mt-n3" cols="3"><SelectPoint v-model="reportItem.point" /></v-col>
            <v-col class="mt-n5" cols="9">
              <Textarea v-model="reportItem.text" :maxlength="300" />
            </v-col>
          </v-row>
        </div>
        <v-row v-if="editReport.selectTeam !== 'home'">
          <v-col>
            <v-img max-height="30" max-width="30" :lazy-src="lazy" :src="match.awayTeam.imageUrl" />
          </v-col>
        </v-row>
        <div v-if="editReport.selectTeam !== 'home'">
          <v-row v-for="reportItem in editReport.awayTeamReportItems" :key="reportItem.id">
            <v-col cols="3"> {{ reportItem.position }}. {{ reportItem.shirtNumber }} </v-col>
            <v-col cols="9">{{ reportItem.player.name }}</v-col>
            <v-col class="mt-n3" cols="3"><SelectPoint v-model="reportItem.point" /></v-col>
            <v-col class="mt-n5" cols="9">
              <Textarea v-model="reportItem.text" :maxlength="300" />
            </v-col>
          </v-row>
        </div>
        <v-row>
          <v-col cols="10" sm="7">
            <SelectIdMom
              v-model="editReport.momId"
              :away-team-report-items="editReport.awayTeamReportItems"
              :home-team-report-items="editReport.homeTeamReportItems"
              :select-team="editReport.selectTeam"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <Textarea v-model="editReport.summary" :label="'総評'" :maxlength="300" />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10" sm="6">
            <ButtonSubmit
              :text="editReport.publish ? '更新する' : '更新して公開する'"
              :is-loading="isLoadingUpdate"
              @click="updateReport(true)"
            />
          </v-col>
          <v-col cols="10" sm="6">
            <ButtonSubmit
              :disabled="editReport.publish"
              :text="'非公開にして一時保存する'"
              :is-loading="isLoadingUpdate"
              @click="updateReport(false)"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
/** check */
import { defineComponent } from '@nuxtjs/composition-api'
import useEdit from '@/composables/reports/useEdit'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import RowMatchHeader from '@/components/organisms/RowMatchHeader.vue'
import SelectIdMom from '@/components/molecules/SelectIdMom.vue'
import SelectPoint from '@/components/molecules/SelectPoint.vue'
import Textarea from '@/components/molecules/Textarea.vue'
import TextField from '@/components/molecules/TextField.vue'

export default defineComponent({
  name: 'ReportEdit',

  components: {
    ButtonSubmit,
    ContainerLoading,
    RowMatchHeader,
    SelectIdMom,
    SelectPoint,
    Textarea,
    TextField
  },

  setup() {
    const { editReport, isLoadingSetUp, isLoadingUpdate, match, setUp, updateReport } = useEdit()
    const lazy = require('@/assets/lazy.png')

    setUp()

    return { editReport, isLoadingSetUp, isLoadingUpdate, lazy, match, updateReport }
  },

  head() {
    return {
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }
})
</script>
