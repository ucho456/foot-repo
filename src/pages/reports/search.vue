<template>
  <v-container>
    <ButtonBlockBlue :text="'Search'" :loading="isLoading" @click="getTrigger" />
    <div>
      {{ res }}
    </div>
    <div>
      {{ err }}
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ButtonBlockBlue from '@/components/molecules/ButtonBlockBlue.vue'
import getMatches from '@/utils/api/getMatches'

export default defineComponent({
  name: 'Search',

  components: {
    ButtonBlockBlue
  },

  setup() {
    const url = '/competitions/2021/matches?matchday=1'
    const { res, err, isLoading, getTrigger } = getMatches(url)
    return { res, isLoading, err, getTrigger }
  }
})
</script>
