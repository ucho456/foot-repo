<template>
  <v-card outlined>
    <ReportTable :loading="isLoadingReports" :reports="reports.data" />
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useIndex from '@/composables/useIndex'
import useStore from '@/utils/useStore'
import ReportTable from '@/components/organisms/ReportTable.vue'

export default defineComponent({
  name: 'Index',

  components: {
    ReportTable
  },

  setup() {
    const { isLoadingReports, setUp } = useIndex()
    const { reports } = useStore()

    setUp()

    return { isLoadingReports, reports }
  }
})
</script>
