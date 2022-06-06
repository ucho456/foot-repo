<template>
  <v-card outlined>
    <ContainerReportTable :reports="reports.data" />
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useIndex from '@/composables/useIndex'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'
import ContainerReportTable from '@/components/organisms/ContainerReportTable.vue'

export default defineComponent({
  name: 'Index',

  components: {
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
