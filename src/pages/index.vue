<template>
  <v-container>
    <v-card outlined>
      <ContainerLoading :is-loading="isLoadingReports" />
      <ContainerReportTable
        v-if="!isLoadingReports"
        :h2="'みんなの選手採点'"
        :reports="reports.data"
      />
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useIndex from '@/composables/useIndex'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import ContainerReportTable from '@/components/organisms/ContainerReportTable.vue'

export default defineComponent({
  name: 'Index',

  components: {
    ContainerLoading,
    ContainerReportTable
  },

  setup() {
    const { isLoadingReports, setUp } = useIndex()
    const { openSnackbar } = useSnackbar()
    const { reports } = useStore()

    const setUpPage = async () => {
      const result = await setUp()
      if (result === 'failure') {
        openSnackbar(result, 'データの取得に失敗しました。')
      }
    }
    setUpPage()

    return { isLoadingReports, reports }
  }
})
</script>
