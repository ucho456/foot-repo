<template>
  <v-container>
    <!-- <IndexReportList :report-list="reportList" :is-loading="false" :err="''" /> -->
    <button @click="logout">ログアウト</button>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { getAuth, signOut } from 'firebase/auth'
// import IndexReportList from '@/components/organisms/IndexReportList.vue'
// import { reports, users } from '@/utils/testData'
// import { makeReportList } from '@/composables/useIndex'
import useCurrentUser from '@/utils/useCurrentUser'

export default defineComponent({
  name: 'Index',

  components: {
    // IndexReportList
  },

  setup() {
    // user情報を変更する時はreloadを挟んでcurrentUserを更新する。サンプル
    const currentUser = useCurrentUser()
    console.log('currentUser', currentUser)
    // const reportList = makeReportList(reports, users)
    const auth = getAuth()
    const logout = () => {
      signOut(auth)
        .then(() => {
          console.log('logout currentUser', currentUser)
        })
        .catch(() => {
          console.log('logout error')
        })
    }
    return { logout }
  }
})
</script>
