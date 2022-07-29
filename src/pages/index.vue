<template>
  <v-container>
    <v-card min-height="600" outlined>
      <ContainerLoading :is-loading="isLoadingReports" />
      <ContainerReportTable
        v-if="!isLoadingReports"
        :h2="'みんなの選手採点'"
        :reports="reports.data"
        :search-button-flg="true"
        @search="showDialog"
      />
      <v-container v-if="!isLoadingReports">
        <v-row justify="center">
          <v-col cols="5">
            <ButtonOutlined :text="'投稿する'" @click="pushToReportSearch" />
          </v-col>
          <v-col cols="5">
            <ButtonOutlined :text="'検索する'" @click="showDialog" />
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
import { defineComponent, useFetch } from '@nuxtjs/composition-api'
import useIndex from '@/composables/useIndex'
import { toStoreReportsFromFunctions } from '@/db/reports'
import useStore from '@/utils/useStore'
import ButtonOutlined from '@/components/molecules/ButtonOutlined.vue'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import ContainerReportTable from '@/components/organisms/ContainerReportTable.vue'

export default defineComponent({
  name: 'Index',

  components: {
    ButtonOutlined,
    ContainerLoading,
    ContainerReportTable,
    DialogSearch: () => import('@/components/organisms/DialogSearch.vue')
  },

  setup() {
    const {
      clearYearMonth,
      hideDialog,
      inputCompetitionId,
      inputTeamId,
      inputYearMonth,
      isDialog,
      isLoadingReports,
      pushToReports,
      pushToReportSearch,
      setUp,
      showDialog
    } = useIndex()
    const { reports } = useStore()

    useFetch(async () => {
      process.server ? await toStoreReportsFromFunctions(reports) : setUp()
    })

    return {
      clearYearMonth,
      hideDialog,
      inputCompetitionId,
      inputTeamId,
      inputYearMonth,
      isDialog,
      isLoadingReports,
      pushToReports,
      pushToReportSearch,
      reports,
      showDialog
    }
  }
})
</script>
