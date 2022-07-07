<template>
  <v-container>
    <v-card outlined>
      <ContainerLoading :is-loading="isLoadingFirst" />
      <v-container v-if="!isLoadingFirst">
        <v-row>
          <v-col cols="9" align-self="center"> 採点する試合を選んで下さい。 </v-col>
          <v-col cols="3" class="text-right">
            <v-btn icon @click="showDialog">
              <v-icon>{{ mdiMagnify }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="matches.data.length === 0">
          <v-col>条件に合う試合はありません。</v-col>
        </v-row>
        <v-list class="mt-n4" three-line>
          <div v-for="match in matches.data" :key="match.id">
            <v-list-item exact router :to="{ path: 'new', query: { matchId: match.id } }">
              <v-list-item-avatar>
                <v-img :lazy-src="lazy" :src="match.homeTeam.imageUrl" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-row>
                  <v-col cols="6">
                    <v-list-item-title class="text-right">{{
                      match.homeTeam.name
                    }}</v-list-item-title>
                  </v-col>
                  <v-col cols="6">
                    <v-list-item-title class="text-left">{{
                      match.awayTeam.name
                    }}</v-list-item-title>
                  </v-col>
                </v-row>
                <v-list-item-subtitle class="mt-n3 text-center">
                  {{ match.homeTeam.score }} - {{ match.awayTeam.score }}
                </v-list-item-subtitle>
                <v-list-item-subtitle class="text-center">
                  {{ match.jstDate }} / {{ match.competition.name }} / {{ match.matchday }}節
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-avatar>
                <v-img :lazy-src="lazy" :src="match.awayTeam.imageUrl" />
              </v-list-item-avatar>
            </v-list-item>
          </div>
        </v-list>
        <v-row justify="center">
          <v-col cols="10">
            <ButtonSubmit
              :disabled="!hasNextPage"
              :is-loading="isLoadingNext"
              :text="'もっと読み込む'"
              @click="readMore"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <DialogSearch
      :is-dialog="isDialog"
      :search-option="matches.searchOption"
      @input-competition-id="inputCompetitionId"
      @input-team-id="inputTeamId"
      @input-year-month="inputYearMonth"
      @clear-year-month="clearYearMonth"
      @hide="hideDialog"
      @search="search"
    />
    <DialogConfirmLogin
      :is-dialog="isDialogConfirmLogin"
      :text="'ログインが完了していません。\nゲストとして選手採点を投稿しますか？'"
      @guest="continueGuest"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, watch } from '@nuxtjs/composition-api'
import { mdiMagnify } from '@mdi/js'
import useSearch from '@/composables/reports/useSearch'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import DialogSearch from '@/components/organisms/DialogSearch.vue'
import DialogConfirmLogin from '@/components/organisms/DialogConfirmLogin.vue'

export default defineComponent({
  name: 'ReportSearch',

  components: {
    ContainerLoading,
    ButtonSubmit,
    DialogSearch,
    DialogConfirmLogin
  },

  setup() {
    const {
      isDialogConfirmLogin,
      confirmLogin,
      continueGuest,
      isLoadingFirst,
      setUp,
      isLoadingNext,
      hasNextPage,
      readMore,
      search,
      isDialog,
      showDialog,
      hideDialog,
      inputCompetitionId,
      inputTeamId,
      inputYearMonth,
      clearYearMonth
    } = useSearch()
    const { openSnackbar } = useSnackbar()
    const { matches } = useStore()
    const lazy = require('@/assets/lazy.png')

    confirmLogin()

    const setUpPage = async (): Promise<void> => {
      if (matches.data.length === 0) {
        const result = await setUp()
        if (result === 'failure') {
          openSnackbar(result, 'データの取得に失敗しました。')
        }
      }
    }
    setUpPage()

    watch(hasNextPage, (newVal, oldVal) => {
      if (newVal === false && oldVal === true) {
        openSnackbar('alert', '検索条件に合う全ての試合の取得を完了しています。')
      }
    })

    return {
      isDialogConfirmLogin,
      continueGuest,
      isLoadingFirst,
      isLoadingNext,
      hasNextPage,
      readMore,
      search,
      isDialog,
      showDialog,
      hideDialog,
      inputCompetitionId,
      inputTeamId,
      inputYearMonth,
      clearYearMonth,
      matches,
      mdiMagnify,
      lazy
    }
  }
})
</script>
