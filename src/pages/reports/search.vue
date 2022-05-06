<template>
  <v-card outlined>
    <MatchTable :err="''" :is-loading="false" :matches="matches" />
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useSearch from '@/composables/reports/useSearch'
import MatchTable from '@/components/organisms/MatchTable.vue'

export default defineComponent({
  name: 'Search',

  components: {
    MatchTable
  },

  setup() {
    const { matches, get } = useSearch()
    get()
    return { matches }
  }
})
</script>
