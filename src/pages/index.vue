<template>
  <v-container>
    <v-card outlined>
      <ContainerLoading :is-loading="isLoadingReports" />
      <ContainerReportTable
        v-if="!isLoadingReports"
        :h2="'みんなの選手採点'"
        :reports="reports.data"
        :is-loading="isLoadingChangeReports"
        :search-button-flg="true"
        :tabs="tabs"
        @search="showDialog"
        @change-tab="changeTab"
      />
    </v-card>
    <DialogSearch
      :is-dialog="isDialog"
      :search-option="reports.searchOption"
      @input-competition-id="inputCompetitionId"
      @input-team-id="inputTeamId"
      @input-date="inputDate"
      @clear-date="clearDate"
      @close="hideDialog"
      @search="pushToReports"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, useRouter, watch } from '@nuxtjs/composition-api'
import useIndex from '@/composables/useIndex'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import ContainerReportTable from '@/components/organisms/ContainerReportTable.vue'
import DialogSearch from '@/components/organisms/DialogSearch.vue'

export default defineComponent({
  name: 'Index',

  components: {
    ContainerLoading,
    ContainerReportTable,
    DialogSearch
  },

  setup() {
    const router = useRouter()
    const {
      isLoadingReports,
      setUp,
      isDialog,
      showDialog,
      hideDialog,
      inputCompetitionId,
      inputTeamId,
      inputDate,
      clearDate,
      tab,
      tabs,
      changeTab,
      isLoadingChangeReports,
      changeReports
    } = useIndex()
    const { openSnackbar } = useSnackbar()
    const { reports } = useStore()

    const setUpPage = async () => {
      const result = await setUp()
      if (result === 'failure') {
        openSnackbar(result, '選手採点の取得に失敗しました。')
      }
    }
    setUpPage()

    watch(tab, async () => {
      const result = await changeReports()
      if (result === 'failure') {
        openSnackbar(result, '選手採点の取得に失敗しました。')
      }
    })

    const pushToReports = (): void => {
      router.push('/reports')
    }

    return {
      isLoadingReports,
      isDialog,
      showDialog,
      hideDialog,
      tabs,
      changeTab,
      isLoadingChangeReports,
      inputCompetitionId,
      inputTeamId,
      inputDate,
      clearDate,
      reports,
      pushToReports
    }
  }
})
</script>
