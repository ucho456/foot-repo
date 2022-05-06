<template>
  <v-card outlined>
    <MatchTable :err="''" :loading="isLoadingFirst" :matches="matches" />
    <v-container>
      <v-row justify="center">
        <v-col cols="10">
          <ButtonSubmit
            :disabled="false"
            :icon="'mdi-page-next'"
            :loading="isLoading"
            :text="'もっと読み込む'"
            @click="getNextPage"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useSearch from '@/composables/reports/useSearch'
import MatchTable from '@/components/organisms/MatchTable.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'

export default defineComponent({
  name: 'Search',

  components: {
    MatchTable,
    ButtonSubmit
  },

  setup() {
    const { matches, isLoadingFirst, isLoading, getFirstPage, getNextPage } = useSearch()
    getFirstPage()
    return { matches, isLoadingFirst, isLoading, getNextPage }
  }
})
</script>
