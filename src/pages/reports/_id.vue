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
        <v-row v-if="!report.publish" justify="center">
          <v-col cols="4" md="2" class="private"> 非公開 </v-col>
        </v-row>
        <v-row>
          <ColUserImageName
            :user-id="report.user.id"
            :image-url="report.user.imageUrl"
            :name="report.user.name"
          />
        </v-row>
        <RowMatchHeader v-bind="match" />
        <v-row v-if="report.selectTeam !== 'away'">
          <v-col>
            <v-img max-height="30" max-width="30" :src="match.homeTeam.imageUrl" />
          </v-col>
        </v-row>
        <v-row v-if="report.selectTeam !== 'away'">
          <v-container>
            <v-row v-for="htrItem in homeTeamReportItems" :key="htrItem.id">
              <v-col cols="12" class="font-weight-bold">
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
              <v-col cols="12" class="font-weight-bold">
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
        <v-row>
          <v-col>
            <v-btn icon color="#1da1f2" @click="share('twitter')">
              <v-icon>{{ mdiTwitter }}</v-icon>
            </v-btn>
            <v-btn icon color="#3b5998" @click="share('facebook')">
              <v-icon>{{ mdiFacebook }}</v-icon>
            </v-btn>
            <v-btn
              icon
              :color="like ? 'orange' : 'grey'"
              :disabled="!loginUser || loginUser.uid === report.user.id"
              :loading="isLoadingUpdateLike"
              @click="clickLike"
            >
              <v-icon>{{ mdiThumbUp }}</v-icon>
            </v-btn>
            {{ report.likeCount }}
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card v-if="!isLoadingReport" class="mt-4" outlined>
      <ContainerLoading :is-loading="isLoadingUser" />
      <v-container v-if="user && report">
        <v-row>
          <v-col cols="12" class="mb-n6">
            <h2>投稿者</h2>
          </v-col>
          <ColUserImageName
            :cols="7"
            :sm="9"
            :md="9"
            :image-url="user.imageUrl"
            :name="user.name"
            :user-id="user.id"
          />
          <v-col cols="5" sm="3">
            <ButtonFollow
              v-if="loginUser && loginUser.uid !== user.id"
              :follow="follow"
              :is-loading="isLoadingUpdateFollow"
              :user-id="user.id"
              @click="clickFollow"
            />
          </v-col>
          <v-col cols="12" class="mt-n4">マイチーム：{{ user.team.name }}</v-col>
          <v-col cols="12" class="greet mt-n4">{{ user.greet }}</v-col>
        </v-row>
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
          <ColUserImageName
            :image-size="20"
            :image-url="comment.user.imageUrl"
            :name="comment.user.name"
            :user-id="comment.user.id"
          />
          <v-col class="comment mt-n4 pl-11">{{ comment.text }}</v-col>
        </v-row>
        <v-row>
          <ColUserImageName
            v-if="loginUser"
            :image-url="loginUser.imageUrl"
            :name="loginUser.name"
          />
          <ColUserImageName v-else :name="'Guest'" />
        </v-row>
        <v-row>
          <v-col cols="12"> <Textarea v-model="inputComment" :maxlength="140" /></v-col>
          <v-col cols="6" class="mt-n8">
            <ButtonSubmit
              :disabled="inputComment.length === 0"
              :is-loading="isLoadingNewComment"
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
    <DialogShare
      :dialog="dialogShare"
      @click="hide"
      @facebook="share('facebook')"
      @twitter="share('twitter')"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, useRoute, useRouter, ref } from '@nuxtjs/composition-api'
import { mdiFacebook, mdiThumbUp, mdiTwitter } from '@mdi/js'
import useShow from '@/composables/reports/useShow'
import useLoginUser from '@/utils/useLoginUser'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'
import ButtonFollow from '@/components/molecules/ButtonFollow.vue'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import ColUserImageName from '@/components/organisms/ColUserImageName.vue'
import RowMatchHeader from '@/components/organisms/RowMatchHeader.vue'
import ContainerReportTable from '@/components/organisms/ContainerReportTable.vue'
import Textarea from '@/components/molecules/Textarea.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import DialogConfirmLogin from '@/components/molecules/DialogConfirmLogin.vue'
import DialogShare from '@/components/molecules/DialogShare.vue'

export default defineComponent({
  name: 'ReportShow',

  components: {
    ButtonFollow,
    ContainerLoading,
    ColUserImageName,
    RowMatchHeader,
    ContainerReportTable,
    Textarea,
    ButtonSubmit,
    DialogConfirmLogin,
    DialogShare
  },

  setup() {
    const route = useRoute()
    const router = useRouter()
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
      share,
      like,
      updateLike,
      inputComment,
      isLoadingNewComment,
      isDialog,
      create,
      updateFollow,
      follow,
      isLoadingUpdateFollow,
      isLoadingUpdateLike
    } = useShow()
    const { loginUser } = useLoginUser()
    const { openSnackbar } = useSnackbar()
    const { confirmation } = useStore()

    const setUpPage = async () => {
      const reportId = route.value.params.id as string
      const result = await setUp(reportId)
      if (result === 'failure') {
        openSnackbar(result, 'データの取得に失敗しました。')
      } else if (result === 'unauthorized access') {
        openSnackbar(result, '不正なアクセスが発生した為、ホーム画面に遷移しました。')
        router.push('/')
      }
    }
    setUpPage()

    const clickLike = async (): Promise<void> => {
      const result = await updateLike()
      if (result === 'failure') {
        openSnackbar(result, '通信エラーが発生しました。')
      }
    }

    const clickFollow = async (userId: string): Promise<void> => {
      const result = await updateFollow(userId)
      if (result === 'failure') {
        openSnackbar(result, '通信エラーが発生しました。')
      }
    }

    const confirmLogin = (): void => {
      if (!confirmation.isLogin && !loginUser.value) {
        isDialog.value = true
      } else {
        confirmation.isLogin = true
        submitCreate()
      }
    }

    const submitCreate = async (): Promise<void> => {
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

    const dialogShare = ref(false)
    const show = () => {
      if (process.client && route.value.query.publish) dialogShare.value = true
    }
    const hide = () => {
      dialogShare.value = false
    }
    show()

    return {
      clickFollow,
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
      share,
      like,
      clickLike,
      inputComment,
      isLoadingNewComment,
      isDialog,
      loginUser,
      confirmLogin,
      submitCreate,
      follow,
      isLoadingUpdateFollow,
      isLoadingUpdateLike,
      dialogShare,
      show,
      hide,
      mdiFacebook,
      mdiThumbUp,
      mdiTwitter
    }
  }
})
</script>

<style lang="scss" scoped>
.private {
  color: #1a237e;
  background-color: #{$light-indigo};
  border-radius: 5px;
  text-align: center;
}
.mom {
  background: linear-gradient(transparent 70%, yellow 70%);
}
.comment {
  border-bottom: 1px solid #{$light-indigo};
}
.greet {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
