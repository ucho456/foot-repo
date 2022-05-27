<template>
  <v-card outlined>
    <MatchTable :loading="isLoadingSetUp" :matches="matches.data" @click="showDialog" />
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
    <DialogSearch
      :dialog="dialog"
      :search-option="matches.searchOption"
      @input-competition-id="inputCompetitionId"
      @input-team-id="inputTeamId"
      @input-date="inputDate"
      @clear-date="clearDate"
      @close="hideDialog"
      @search="search"
    />
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useSearch from '@/composables/reports/useSearch'
import useStore from '@/utils/useStore'
import useSnackbar from '@/utils/useSnackbar'
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
      isLoadingSetUp,
      setUp,
      isLoading,
      getNextPage,
      search,
      dialog,
      showDialog,
      hideDialog,
      inputCompetitionId,
      inputTeamId,
      inputDate,
      clearDate
    } = useSearch()
    const { matches } = useStore()
    const { openSnackbar } = useSnackbar()

    const setUpPage = async (): Promise<void> => {
      if (matches.data.length === 0) {
        const result = await setUp()
        if (result === 'failure') {
          openSnackbar(result, 'データの取得に失敗しました。')
        }
      }
    }
    setUpPage()

    return {
      isLoadingSetUp,
      isLoading,
      getNextPage,
      search,
      dialog,
      showDialog,
      hideDialog,
      matches,
      inputCompetitionId,
      inputTeamId,
      inputDate,
      clearDate
    }
  }
})
</script>
