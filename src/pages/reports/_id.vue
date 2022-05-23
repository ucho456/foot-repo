<template>
  <v-card outlined>
    <v-container v-if="isLoadingSetUp" class="pb-10 pt-10">
      <v-row justify="center">
        <v-progress-circular color="primary" indeterminate />
      </v-row>
    </v-container>
    <v-container v-else>
      <ReportsHeader v-bind="match" />
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import useShow from '@/composables/reports/useShow'
import useSnackbar from '@/utils/useSnackbar'
import ReportsHeader from '@/components/organisms/ReportsHeader.vue'
// import ReportsShowBody from '@/components/organisms/ReportsShowBody.vue'
// import { setUpDispReport } from '@/composables/useReportsShow'
// import { reports, users } from '@/utils/testData'

export default defineComponent({
  name: 'ReportShow',

  components: {
    ReportsHeader
    // ReportsShowBody
  },

  setup() {
    const route = useRoute()
    const { report, match, isLoadingSetUp, setUp } = useShow()
    const { openSnackbar } = useSnackbar()

    const setUpPage = async () => {
      const reportId = route.value.query.reportId as string
      const result = await setUp(reportId)
      if (result === 'failure') {
        openSnackbar(result, '選手採点データの取得に失敗しました。')
      }
    }
    setUpPage()

    return { report, match, isLoadingSetUp }
  }
})
</script>

<style lang="scss" scoped>
.user-name {
  line-height: 30px;
}
.mom {
  background: linear-gradient(transparent 70%, yellow 70%);
}
@media (max-width: $tabletBreakpoints) {
  h1 {
    font-size: 20px;
  }
}
</style>
