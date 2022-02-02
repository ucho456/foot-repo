<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" sm="10">
        <ReportsMatchList :err="''" :is-loading="false" :match-list="matchList" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ReportsMatchList from '@/components/organisms/ReportsMatchList.vue'
import { matches } from '@/utils/testData'
import { makeMatchList } from '@/composables/useReportsSearch'

export default defineComponent({
  name: 'Search',

  components: {
    ReportsMatchList
  },

  layout: 'noside',

  setup() {
    const matchList = makeMatchList(matches)
    return { matchList }
  }
})
</script>
