<template>
  <v-container>
    <!-- <IndexReportList :report-list="reportList" :is-loading="false" :err="''" /> -->
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
// import IndexReportList from '@/components/organisms/IndexReportList.vue'
// import { reports, users } from '@/utils/testData'
// import { makeReportList } from '@/composables/useIndex'

export default defineComponent({
  name: 'Index',

  components: {
    // IndexReportList
  },

  setup() {
    // const reportList = makeReportList(reports, users)
  }
})
</script>
