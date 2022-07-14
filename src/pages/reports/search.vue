<template>
  <v-container>
    <v-card min-height="600" outlined>
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
                    <v-list-item-title class="text-right">
                      {{ match.homeTeam.name }}
                    </v-list-item-title>
                  </v-col>
                  <v-col cols="6">
                    <v-list-item-title class="text-left">
                      {{ match.awayTeam.name }}
                    </v-list-item-title>
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
              :disabled="!matches.hasNext"
              :is-loading="isLoadingNext"
              :text="'もっと読み込む'"
              @click="readNextMatches"
            />
          </v-col>
          <client-only>
            <v-col v-if="loginUser" cols="10">
              <ButtonOutlined
                :text="'試合が見つからない場合はこちら'"
                @click="pushToPromptUpdate"
              />
            </v-col>
          </client-only>
        </v-row>
      </v-container>
    </v-card>
    <DialogSearch
      :is-dialog="isDialog"
      :search-option="matches.searchOption"
      @clear-year-month="clearYearMonth"
      @hide="hideDialog"
      @input-competition-id="inputCompetitionId"
      @input-team-id="inputTeamId"
      @input-year-month="inputYearMonth"
      @search="search"
    />
    <client-only>
      <DialogConfirmLogin
        :is-dialog="isDialogConfirmLogin"
        :text="'ログインが完了していません。\nゲストとして選手採点を投稿しますか？'"
        @guest="continueGuest"
      />
    </client-only>
  </v-container>
</template>

<script lang="ts">
/** check */
import { defineComponent } from '@nuxtjs/composition-api'
import { mdiMagnify } from '@mdi/js'
import useSearch from '@/composables/reports/useSearch'
import useLoginUser from '@/utils/useLoginUser'
import useStore from '@/utils/useStore'
import ButtonOutlined from '@/components/molecules/ButtonOutlined.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import DialogConfirmLogin from '@/components/organisms/DialogConfirmLogin.vue'
import DialogSearch from '@/components/organisms/DialogSearch.vue'

export default defineComponent({
  name: 'ReportSearch',

  components: {
    ButtonOutlined,
    ButtonSubmit,
    ContainerLoading,
    DialogConfirmLogin,
    DialogSearch
  },

  setup() {
    const {
      clearYearMonth,
      confirmLogin,
      continueGuest,
      hideDialog,
      inputCompetitionId,
      inputTeamId,
      inputYearMonth,
      isDialog,
      isDialogConfirmLogin,
      isLoadingFirst,
      isLoadingNext,
      pushToPromptUpdate,
      readNextMatches,
      search,
      setUp,
      showDialog
    } = useSearch()
    const { loginUser } = useLoginUser()
    const { matches } = useStore()
    const lazy = require('@/assets/lazy.png')

    confirmLogin()
    setUp()

    return {
      clearYearMonth,
      continueGuest,
      hideDialog,
      inputCompetitionId,
      inputTeamId,
      inputYearMonth,
      isDialog,
      isDialogConfirmLogin,
      isLoadingFirst,
      isLoadingNext,
      lazy,
      loginUser,
      matches,
      mdiMagnify,
      pushToPromptUpdate,
      readNextMatches,
      search,
      showDialog
    }
  },

  head() {
    return {
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }
})
</script>
