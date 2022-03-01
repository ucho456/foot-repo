<template>
  <v-container>
    <IndexReportList :report-list="reportList" :is-loading="false" :err="''" />
    <button @click="get">取得</button>
    {{ aaa }}
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import IndexReportList from '@/components/organisms/IndexReportList.vue'
import { reports, users } from '@/utils/testData'
import { makeReportList } from '@/composables/useIndex'

export default defineComponent({
  name: 'Index',

  components: {
    IndexReportList
  },

  setup(_, ctx) {
    const aaa = ref()
    const testUsersRef = ctx.root.$fireModule.firestore().collection('testUsers')
    const get = async () => {
      const testUser = await testUsersRef.doc('BW21faVmA9TEHwSPQtj9').get()
      if (testUser) {
        aaa.value = testUser.data() as { name: string; age: number; location: string }
      }
      // .then((doc) => {
      //   console.log(doc.data())
      // })
      console.log(testUser)
      // aaa.value = snapShot
    }
    // const snapShot = fb.collection('testUsers').doc('BW21faVmA9TEHwSPQtj9').get()
    const reportList = makeReportList(reports, users)
    return { reportList, get, aaa }
  }
})
</script>
