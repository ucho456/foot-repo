<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" sm="10">
        <ReportsSearchMatchList
          :competition="res.competition"
          :err="err"
          :is-loading="isLoading"
          :matches="res.matches"
          @click="getTrigger('/competitions/2014/matches?matchday=1')"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ReportsSearchMatchList from '@/components/organisms/ReportsSearchMatchList.vue'
import getMatches from '@/utils/api/getMatches'

export default defineComponent({
  name: 'Search',

  components: {
    ReportsSearchMatchList
  },

  layout: 'noside',

  setup() {
    const { res, err, isLoading, getTrigger } = getMatches()
    const url = '/competitions/2021/matches?matchday=1'
    getTrigger(url)
    return { res, isLoading, err, getTrigger }
  }
})
</script>
