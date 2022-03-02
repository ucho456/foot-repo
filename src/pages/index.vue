<template>
  <v-container>
    <IndexReportList :report-list="reportList" :is-loading="false" :err="''" />
    <button @click="get">取得</button>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { getDoc, doc } from 'firebase/firestore'
import db from '@/plugins/firebase'
import IndexReportList from '@/components/organisms/IndexReportList.vue'
import { reports, users } from '@/utils/testData'
import { makeReportList } from '@/composables/useIndex'
export default defineComponent({
  name: 'Index',

  components: {
    IndexReportList
  },

  setup() {
    const get = async () => {
      const testUsersRef = doc(db, 'testUsers', 'BW21faVmA9TEHwSPQtj9')
      const snapShot = await getDoc(testUsersRef)
      console.log(snapShot.data())
    }
    const reportList = makeReportList(reports, users)
    return { reportList, get }
  }
})
</script>
