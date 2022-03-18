<template>
  <v-container>
    <IndexReportList :report-list="reportList" :is-loading="false" :err="''" />
    <button @click="get">取得</button>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import IndexReportList from '@/components/organisms/IndexReportList.vue'
import { reports, users } from '@/utils/testData'
import { makeReportList } from '@/composables/useIndex'
import useCurrentUser from '@/utils/useCurrentUser'
export default defineComponent({
  name: 'Index',

  components: {
    IndexReportList
  },

  setup() {
    const currentUser = useCurrentUser()
    console.log('currentUser', currentUser)
    const reportList = makeReportList(reports, users)
    return { reportList }
  }
})
</script>
