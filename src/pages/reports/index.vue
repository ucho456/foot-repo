<template>
  <v-container>
    <v-card outlined>
      <ContainerLoading :is-loading="isLoading" />
      <ContainerReportTable
        v-if="!isLoading"
        :h2="'みんなの選手採点'"
        :reports="reports.data"
        :search-button-flg="true"
        @click="showDialog"
      />
      <v-container>
        <v-row justify="center">
          <v-col cols="10">
            <ButtonSubmit :icon="'mdi-page-next'" :text="'もっと読み込む'" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <DialogSearch
      :is-dialog="isDialog"
      :search-option="reports.searchOption"
      @input-competition-id="inputCompetitionId"
      @input-team-id="inputTeamId"
      @input-date="inputDate"
      @clear-date="clearDate"
      @close="hideDialog"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useIndex from '@/composables/reports/useIndex'
import useStore from '@/utils/useStore'
import useSnackbar from '@/utils/useSnackbar'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import ContainerReportTable from '@/components/organisms/ContainerReportTable.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import DialogSearch from '@/components/organisms/DialogSearch.vue'

export default defineComponent({
  name: 'Reports',

  components: {
    ContainerLoading,
    ContainerReportTable,
    ButtonSubmit,
    DialogSearch
  },

  setup() {
    const {
      isLoading,
      setUp,
      isDialog,
      showDialog,
      hideDialog,
      inputCompetitionId,
      inputTeamId,
      inputDate,
      clearDate
    } = useIndex()
    const { reports } = useStore()
    const { openSnackbar } = useSnackbar()

    const setUpPage = async () => {
      const result = await setUp()
      if (result === 'failure') {
        openSnackbar(result, 'データの取得に失敗しました。')
      }
    }
    setUpPage()

    return {
      isLoading,
      isDialog,
      showDialog,
      hideDialog,
      inputCompetitionId,
      inputTeamId,
      inputDate,
      clearDate,
      reports
    }
  }
})
</script>
