<template>
  <v-container>
    <ButtonBlockBlue
      :loading="isLoading"
      :text="'検索'"
      @click="getTrigger('/competitions/2014/matches?matchday=1')"
    />
    <ReportsSearchMatchList
      :competition="res.competition"
      :err="err"
      :is-loading="isLoading"
      :matches="res.matches"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ButtonBlockBlue from '@/components/molecules/ButtonBlockBlue.vue'
import ReportsSearchMatchList from '@/components/organisms/ReportsSearchMatchList.vue'
import getMatches from '@/utils/api/getMatches'

export default defineComponent({
  name: 'Search',

  components: {
    ButtonBlockBlue,
    ReportsSearchMatchList
  },

  setup() {
    const { res, err, isLoading, getTrigger } = getMatches()
    const url = '/competitions/2021/matches?matchday=1'
    getTrigger(url)
    return { res, isLoading, err, getTrigger }
  }
})
</script>
