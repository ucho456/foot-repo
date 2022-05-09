<template>
  <v-card outlined>
    <MatchTable :loading="isLoadingFirst" :matches="matches" @click="showDialog" />
    <v-container class="pb-10">
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
    <DialogSearch :dialog="dialog" :search-option="searchOption" @close="hideDialog" />
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useSearch from '@/composables/reports/useSearch'
import MatchTable from '@/components/organisms/MatchTable.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import DialogSearch from '@/components/organisms/DialogSearch.vue'

export default defineComponent({
  name: 'Search',

  components: {
    MatchTable,
    ButtonSubmit,
    DialogSearch
  },

  setup() {
    const {
      matches,
      searchOption,
      isLoadingFirst,
      isLoading,
      getFirstPage,
      getNextPage,
      dialog,
      showDialog,
      hideDialog
    } = useSearch()

    getFirstPage()

    return {
      matches,
      searchOption,
      isLoadingFirst,
      isLoading,
      getNextPage,
      dialog,
      showDialog,
      hideDialog
    }
  }
})
</script>
