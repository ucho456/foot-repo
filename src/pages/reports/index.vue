<template>
  <v-container>
    <v-card outlined>
      <ContainerLoading :is-loading="isLoadingFirst" />
      <ContainerReportTable
        v-if="!isLoadingFirst"
        :h2="'みんなの選手採点'"
        :reports="reports.data"
        :search-button-flg="true"
        @search="showDialog"
      />
      <v-container>
        <v-row v-if="!isLoadingFirst" justify="center">
          <v-col cols="10">
            <ButtonSubmit
              :disabled="!hasNextReports"
              :is-loading="isLoadingNext"
              :text="'もっと読み込む'"
              @click="readNextReports"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <DialogSearch
      :is-dialog="isDialog"
      :search-option="reports.searchOption"
      @clear-year-month="clearYearMonth"
      @hide="hideDialog"
      @input-competition-id="inputCompetitionId"
      @input-team-id="inputTeamId"
      @input-year-month="inputYearMonth"
      @search="search"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useIndex from '@/composables/reports/useIndex'
import useStore from '@/utils/useStore'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import ContainerReportTable from '@/components/organisms/ContainerReportTable.vue'
import DialogSearch from '@/components/organisms/DialogSearch.vue'

export default defineComponent({
  name: 'Reports',

  components: {
    ButtonSubmit,
    ContainerLoading,
    ContainerReportTable,
    DialogSearch
  },

  setup() {
    const {
      clearYearMonth,
      hasNextReports,
      hideDialog,
      inputCompetitionId,
      inputTeamId,
      inputYearMonth,
      isDialog,
      isLoadingFirst,
      isLoadingNext,
      readNextReports,
      search,
      setUp,
      showDialog
    } = useIndex()
    const { reports } = useStore()

    setUp()

    return {
      clearYearMonth,
      hasNextReports,
      hideDialog,
      inputCompetitionId,
      inputTeamId,
      inputYearMonth,
      isDialog,
      isLoadingFirst,
      isLoadingNext,
      readNextReports,
      reports,
      search,
      showDialog
    }
  },

  head() {
    return {
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }
})
</script>
