<template>
  <v-container>
    <v-card min-height="600" outlined>
      <ContainerLoading :is-loading="isLoadingReports" />
      <ContainerReportTable
        v-if="!isLoadingReports"
        :h2="'みんなの選手採点'"
        :is-loading="isLoadingChangeReports"
        :reports="reports.data"
        :search-button-flg="true"
        :tabs="tabs"
        @change-tab="changeTab"
        @search="showDialog"
      />
      <v-container v-if="!isLoadingReports">
        <v-row justify="center">
          <v-col cols="10">
            <ButtonOutlined :text="'選手採点を検索する'" @click="showDialog" />
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
      @search="pushToReports"
    />
  </v-container>
</template>

<script lang="ts">
/** check */
import { defineComponent } from '@nuxtjs/composition-api'
import useIndex from '@/composables/useIndex'
import useStore from '@/utils/useStore'
import ButtonOutlined from '@/components/molecules/ButtonOutlined.vue'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import ContainerReportTable from '@/components/organisms/ContainerReportTable.vue'
import DialogSearch from '@/components/organisms/DialogSearch.vue'

export default defineComponent({
  name: 'Index',

  components: {
    ButtonOutlined,
    ContainerLoading,
    ContainerReportTable,
    DialogSearch
  },

  setup() {
    const {
      changeTab,
      clearYearMonth,
      hideDialog,
      inputCompetitionId,
      inputTeamId,
      inputYearMonth,
      isDialog,
      isLoadingChangeReports,
      isLoadingReports,
      pushToReports,
      setUp,
      showDialog,
      tabs
    } = useIndex()
    const { reports } = useStore()

    setUp()

    return {
      changeTab,
      clearYearMonth,
      hideDialog,
      inputCompetitionId,
      inputTeamId,
      inputYearMonth,
      isDialog,
      isLoadingChangeReports,
      isLoadingReports,
      pushToReports,
      reports,
      showDialog,
      tabs
    }
  }
})
</script>
