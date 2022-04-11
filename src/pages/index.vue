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
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default defineComponent({
  name: 'Index',

  components: {
    // IndexReportList
  },

  setup() {
    const auth = getAuth()
    onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const idTokenResult = await authUser.getIdTokenResult(true)
        console.log('index.vue', idTokenResult.claims.initSetting)
      }
    })
    // const reportList = makeReportList(reports, users)
  }
})
</script>
