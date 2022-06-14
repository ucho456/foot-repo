<template>
  <v-container>
    <v-card outlined>
      <ContainerLoading :is-loading="isLoadingFirst" />
      <v-container v-if="!isLoadingFirst">
        <v-row>
          <v-col cols="9" align-self="center"> 採点する試合を選んで下さい。 </v-col>
          <v-col cols="3" class="text-right">
            <v-btn icon @click="showDialog">
              <v-icon>mdi-magnify</v-icon>
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
                <v-img :src="match.homeTeam.imageUrl" />
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
                <v-img :src="match.awayTeam.imageUrl" />
              </v-list-item-avatar>
            </v-list-item>
          </div>
        </v-list>
        <v-row justify="center">
          <v-col cols="10">
            <ButtonSubmit
              :disabled="false"
              :icon="'mdi-page-next'"
              :loading="isLoadingNext"
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
      @input-date="inputDate"
      @clear-date="clearDate"
      @close="hideDialog"
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
import { defineComponent } from '@nuxtjs/composition-api'
import useSearch from '@/composables/reports/useSearch'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import DialogSearch from '@/components/organisms/DialogSearch.vue'
import DialogConfirmLogin from '@/components/molecules/DialogConfirmLogin.vue'

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
      readMore,
      search,
      isDialog,
      showDialog,
      hideDialog,
      inputCompetitionId,
      inputTeamId,
      inputDate,
      clearDate
    } = useSearch()
    const { openSnackbar } = useSnackbar()
    const { matches } = useStore()

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

    return {
      isDialogConfirmLogin,
      continueGuest,
      isLoadingFirst,
      isLoadingNext,
      readMore,
      search,
      isDialog,
      showDialog,
      hideDialog,
      inputCompetitionId,
      inputTeamId,
      inputDate,
      clearDate,
      matches
    }
  }
})
</script>
