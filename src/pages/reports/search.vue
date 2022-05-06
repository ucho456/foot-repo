<template>
  <v-card outlined>
    {{ matches }}
    <!-- <ReportsMatchList :err="''" :is-loading="false" :match-list="matchList" /> -->
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useSearch from '@/composables/reports/useSearch'
// import ReportsMatchList from '@/components/organisms/ReportsMatchList.vue'

export default defineComponent({
  name: 'Search',

  components: {
    // ReportsMatchList
  },

  setup() {
    const { matches, get } = useSearch()
    get()
    return { matches }
  }
})
</script>
