<template>
  <v-container>
    <v-card outlined>
      <ContainerLoading :is-loading="isLoadingReport" />
      <v-container v-if="report && match">
        <v-row>
          <v-col>
            <h1>{{ report.title }}</h1>
          </v-col>
        </v-row>
        <RowUserImageName :image-url="report.user.imageUrl" :name="report.user.name" />
        <RowMatchHeader v-bind="match" />
        <v-row v-if="report.selectTeam !== 'away'">
          <v-col>
            <v-img
              class="rounded-circle"
              max-height="30"
              max-width="30"
              :src="match.homeTeam.imageUrl"
            />
          </v-col>
        </v-row>
        <v-row v-if="report.selectTeam !== 'away'">
          <v-container>
            <v-row v-for="htrItem in homeTeamReportItems" :key="htrItem.id">
              <v-col cols="12">
                {{ htrItem.position }} {{ htrItem.shirtNumber }} {{ htrItem.player.name }}
                <span v-if="report && report.momId === htrItem.player.id" class="mom">☆MOM</span>
              </v-col>
              <v-col class="mt-n6" cols="12"> {{ htrItem.point }} </v-col>
              <v-col class="mb-5 mt-n6" cols="12">{{ htrItem.text }}</v-col>
            </v-row>
          </v-container>
        </v-row>
        <v-row v-if="report.selectTeam !== 'home'">
          <v-col>
            <v-img
              class="rounded-circle"
              max-height="30"
              max-width="30"
              :src="match.awayTeam.imageUrl"
            />
          </v-col>
        </v-row>
        <v-row v-if="report.selectTeam !== 'home'">
          <v-container>
            <v-row v-for="atrItem in awayTeamReportItems" :key="atrItem.id">
              <v-col cols="12">
                {{ atrItem.position }} {{ atrItem.shirtNumber }} {{ atrItem.player.name }}
                <span v-if="report && report.momId === atrItem.player.id" class="mom">☆MOM</span>
              </v-col>
              <v-col class="mt-n6" cols="12"> {{ atrItem.point }} </v-col>
              <v-col class="mb-5 mt-n6" cols="12">{{ atrItem.text }}</v-col>
            </v-row>
          </v-container>
        </v-row>
        <v-row>
          <v-col cols="12">総評：{{ report.summary }}</v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card v-if="!isLoadingReport" class="mt-4" outlined>
      <ContainerLoading :is-loading="isLoadingUser" />
      <v-container v-if="user">
        <v-row>
          <v-col>
            <h2>投稿者 / ツイートシェアボタン・いいねボタン・チーム名</h2>
          </v-col>
        </v-row>
        <RowUserImageName :image-url="user.imageUrl" :name="user.name" />
        <v-row>
          <v-col class="ml-10 mt-n5">{{ user.teamId }}<br />{{ user.greet }}</v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card v-if="!isLoadingReport && !isLoadingUser" class="mt-4" outlined>
      <ContainerLoading :is-loading="isLoadingSameMatchReports" />
      <ContainerReportTable :h2="'同試合の選手採点'" :reports="sameMatchReports" />
    </v-card>
    <v-card
      v-if="!isLoadingReport && !isLoadingUser && !isLoadingSameMatchReports"
      class="mt-4"
      outlined
    >
      <ContainerLoading :is-loading="isLoadingComments" />
      <v-container v-if="!isLoadingComments">
        <v-row>
          <v-col>
            <h2>コメント</h2>
          </v-col>
        </v-row>
        <v-row v-if="comments.length === 0">
          <v-col>コメントはまだありません。 </v-col>
        </v-row>
        <v-row v-for="comment in comments" :key="comment.id">
          <v-container class="comment">
            <RowUserImageName :image-url="comment.user.imageUrl" :name="comment.user.name" />
            <v-row>
              <v-col class="ml-10 mt-n5">{{ comment.text }}</v-col>
            </v-row>
          </v-container>
        </v-row>
        <client-only>
          <RowUserImageName
            v-if="currentUser"
            :image-url="currentUser.imageUrl"
            :name="currentUser.name"
          />
          <v-row>
            <v-col cols="12"><Textarea v-model="inputComment" :maxlength="140" /></v-col>
            <v-col cols="6" class="mt-n8">
              <ButtonSubmit
                :disabled="inputComment.length === 0"
                :loading="isLoadingNewComment"
                :text="'コメントを投稿'"
                @click="submitCreate"
              />
            </v-col>
          </v-row>
        </client-only>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, useRoute } from '@nuxtjs/composition-api'
import useShow from '@/composables/reports/useShow'
import useCurrentUser from '@/utils/useCurrentUser'
import useSnackbar from '@/utils/useSnackbar'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import RowUserImageName from '@/components/organisms/RowUserImageName.vue'
import RowMatchHeader from '@/components/organisms/RowMatchHeader.vue'
import ContainerReportTable from '@/components/organisms/ContainerReportTable.vue'
import Textarea from '@/components/molecules/Textarea.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'

export default defineComponent({
  name: 'ReportShow',

  components: {
    ContainerLoading,
    RowUserImageName,
    RowMatchHeader,
    ContainerReportTable,
    Textarea,
    ButtonSubmit
  },

  setup() {
    const route = useRoute()
    const {
      report,
      homeTeamReportItems,
      awayTeamReportItems,
      match,
      user,
      sameMatchReports,
      comments,
      unsubscribe,
      isLoadingReport,
      isLoadingUser,
      isLoadingSameMatchReports,
      isLoadingComments,
      setUp,
      inputComment,
      isLoadingNewComment,
      create
    } = useShow()
    const { currentUser } = useCurrentUser()
    const { openSnackbar } = useSnackbar()

    const setUpPage = async () => {
      const reportId = route.value.params.id as string
      const result = await setUp(reportId)
      if (result === 'failure') {
        openSnackbar(result, 'データの取得に失敗しました。')
      }
    }
    setUpPage()

    const submitCreate = async () => {
      const result = await create()
      const message =
        result === 'success' ? 'コメントを作成しました。' : 'コメントの作成に失敗しました。'
      openSnackbar(result, message)
    }

    onBeforeUnmount(() => {
      if (unsubscribe.value) {
        unsubscribe.value()
      }
    })

    return {
      report,
      homeTeamReportItems,
      awayTeamReportItems,
      match,
      user,
      sameMatchReports,
      comments,
      isLoadingReport,
      isLoadingUser,
      isLoadingSameMatchReports,
      isLoadingComments,
      inputComment,
      isLoadingNewComment,
      currentUser,
      submitCreate
    }
  }
})
</script>

<style lang="scss" scoped>
.mom {
  background: linear-gradient(transparent 70%, yellow 70%);
}
.comment {
  border-bottom: 1px solid #{$light-indigo};
}
</style>
