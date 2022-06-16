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
        <RowUser :image-url="report.user.imageUrl" :name="report.user.name" />
        <RowMatchHeader v-bind="match" />
        <v-row v-if="report.selectTeam !== 'away'">
          <v-col>
            <v-img max-height="30" max-width="30" :src="match.homeTeam.imageUrl" />
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
            <v-img max-height="30" max-width="30" :src="match.awayTeam.imageUrl" />
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
        <RowUser
          :image-url="user.imageUrl"
          :image-size="60"
          :name="user.name"
          :team-name="user.teamId"
          :greet="user.greet"
        />
      </v-container>
    </v-card>
    <v-card v-if="!isLoadingReport && !isLoadingUser" class="mt-4" outlined>
      <ContainerLoading :is-loading="isLoadingSameMatchReports" />
      <ContainerReportTable :h2="'同じ試合の選手採点'" :reports="sameMatchReports" />
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
            <RowUser
              :comment="comment.text"
              :image-url="comment.user.imageUrl"
              :name="comment.user.name"
            />
          </v-container>
        </v-row>
        <RowUser v-if="loginUser" :image-url="loginUser.imageUrl" :name="loginUser.name" />
        <RowUser v-else :name="'ゲスト'" />
        <v-row>
          <v-col cols="12"> <Textarea v-model="inputComment" :maxlength="140" /></v-col>
          <v-col cols="6" class="mt-n8">
            <ButtonSubmit
              :disabled="inputComment.length === 0"
              :loading="isLoadingNewComment"
              :text="'コメントを投稿'"
              @click="confirmLogin"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <DialogConfirmLogin
      :is-dialog="isDialog"
      :text="'ログインが完了していません。\nゲストとしてコメントを投稿しますか？'"
      @guest="submitCreate"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, useRoute } from '@nuxtjs/composition-api'
import useShow from '@/composables/reports/useShow'
import useLoginUser from '@/utils/useLoginUser'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import RowUser from '@/components/organisms/RowUser.vue'
import RowMatchHeader from '@/components/organisms/RowMatchHeader.vue'
import ContainerReportTable from '@/components/organisms/ContainerReportTable.vue'
import Textarea from '@/components/molecules/Textarea.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import DialogConfirmLogin from '@/components/molecules/DialogConfirmLogin.vue'

export default defineComponent({
  name: 'ReportShow',

  components: {
    ContainerLoading,
    RowUser,
    RowMatchHeader,
    ContainerReportTable,
    Textarea,
    ButtonSubmit,
    DialogConfirmLogin
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
      unsubscribeComments,
      isLoadingReport,
      isLoadingUser,
      isLoadingSameMatchReports,
      isLoadingComments,
      setUp,
      inputComment,
      isLoadingNewComment,
      isDialog,
      create
    } = useShow()
    const { loginUser } = useLoginUser()
    const { openSnackbar } = useSnackbar()
    const { confirmation } = useStore()

    const setUpPage = async () => {
      const reportId = route.value.params.id as string
      const result = await setUp(reportId)
      if (result === 'failure') {
        openSnackbar(result, 'データの取得に失敗しました。')
      }
    }
    setUpPage()

    const confirmLogin = () => {
      if (!confirmation.isLogin && !loginUser.value) {
        isDialog.value = true
      } else {
        confirmation.isLogin = true
        submitCreate()
      }
    }

    const submitCreate = async () => {
      confirmation.isLogin = true
      isDialog.value = false
      const result = await create()
      const message =
        result === 'success' ? 'コメントを作成しました。' : 'コメントの作成に失敗しました。'
      openSnackbar(result, message)
    }

    onBeforeUnmount(() => {
      if (unsubscribeComments.value) {
        unsubscribeComments.value()
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
      isDialog,
      loginUser,
      confirmLogin,
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
