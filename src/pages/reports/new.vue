<template>
  <v-container>
    <v-card min-height="600" outlined>
      <ContainerLoading :is-loading="isLoadingSetUp" />
      <v-container v-if="!isLoadingSetUp && match">
        <RowMatchHeader v-bind="match" />
        <v-row>
          <v-col>
            <TextField v-model="newReport.title" :label="'タイトル'" :maxlength="100" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="11" sm="6">
            <SelectHomeAway v-model="newReport.selectTeam" />
            <span class="o-note">※チーム選択は後から変更ができません。</span>
          </v-col>
        </v-row>
        <v-row v-if="newReport.selectTeam !== 'away'">
          <v-col>
            <v-img height="30" width="30" :lazy-src="lazy" :src="match.homeTeam.imageUrl" />
          </v-col>
        </v-row>
        <div v-if="newReport.selectTeam !== 'away'">
          <v-row v-for="reportItem in newReport.homeTeamReportItems" :key="reportItem.id">
            <v-col cols="3"> {{ reportItem.position }}. {{ reportItem.shirtNumber }} </v-col>
            <v-col cols="9">{{ reportItem.player.name }}</v-col>
            <v-col class="mt-n3" cols="3"><SelectPoint v-model="reportItem.point" /></v-col>
            <v-col class="mt-n5" cols="9">
              <Textarea v-model="reportItem.text" :maxlength="300" />
            </v-col>
          </v-row>
        </div>
        <v-row v-if="newReport.selectTeam !== 'home'">
          <v-col>
            <v-img height="30" width="30" :lazy-src="lazy" :src="match.awayTeam.imageUrl" />
          </v-col>
        </v-row>
        <div v-if="newReport.selectTeam !== 'home'">
          <v-row v-for="reportItem in newReport.awayTeamReportItems" :key="reportItem.id">
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
              v-model="newReport.momId"
              :away-team-report-items="newReport.awayTeamReportItems"
              :home-team-report-items="newReport.homeTeamReportItems"
              :select-team="newReport.selectTeam"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <Textarea v-model="newReport.summary" :label="'総評'" :maxlength="300" />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10" sm="6">
            <ButtonSubmit
              :text="'投稿する'"
              :is-loading="isLoadingCreate"
              @click="createReport(true)"
            />
          </v-col>
          <v-col v-if="loginUser" cols="10" sm="6">
            <ButtonSubmit
              :text="'非公開にして一時保存する'"
              :is-loading="isLoadingCreate"
              @click="createReport(false)"
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
import useNew from '@/composables/reports/useNew'
import useLoginUser from '@/utils/useLoginUser'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import RowMatchHeader from '@/components/organisms/RowMatchHeader.vue'
import SelectHomeAway from '@/components/molecules/SelectHomeAway.vue'
import SelectIdMom from '@/components/molecules/SelectIdMom.vue'
import SelectPoint from '@/components/molecules/SelectPoint.vue'
import Textarea from '@/components/molecules/Textarea.vue'
import TextField from '@/components/molecules/TextField.vue'

export default defineComponent({
  name: 'ReportNew',

  components: {
    ButtonSubmit,
    ContainerLoading,
    RowMatchHeader,
    SelectHomeAway,
    SelectIdMom,
    SelectPoint,
    Textarea,
    TextField
  },

  setup() {
    const { createReport, isLoadingCreate, isLoadingSetUp, match, newReport, setUp } = useNew()
    const { loginUser } = useLoginUser()
    const lazy = require('@/assets/lazy.png')

    setUp()

    return {
      createReport,
      isLoadingCreate,
      isLoadingSetUp,
      lazy,
      loginUser,
      match,
      newReport
    }
  },

  head() {
    return {
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }
})
</script>

<style lang="scss" scoped>
.o-note {
  position: relative;
  top: -24px;
  font-size: 12px;
  color: red;
}
</style>
