<template>
  <v-container>
    <v-card min-height="600" outlined>
      <ContainerLoading :is-loading="isLoadingReport" />
      <v-container v-if="!isLoadingReport && report && match">
        <v-row>
          <v-col>
            <h1>{{ report.title }}</h1>
          </v-col>
        </v-row>
        <v-row v-if="!report.publish" justify="center">
          <v-col cols="4" md="2" class="o-private"> 非公開 </v-col>
        </v-row>
        <v-row>
          <ColUserImageName
            :image-url="report.user.imageUrl"
            :name="report.user.name"
            :user-id="report.user.id"
          />
        </v-row>
        <RowMatchHeader v-bind="match" />
        <v-row v-if="report.selectTeam !== 'away'">
          <v-col>
            <v-img max-height="30" max-width="30" :lazy-src="lazy" :src="match.homeTeam.imageUrl" />
          </v-col>
        </v-row>
        <v-row v-if="report.selectTeam !== 'away'">
          <v-container>
            <v-row v-for="htrItem in homeTeamReportItems" :key="htrItem.id">
              <v-col cols="12" class="font-weight-bold">
                {{ htrItem.position }} {{ htrItem.shirtNumber }} {{ htrItem.player.name }}
                <span v-if="report && report.momId === htrItem.player.id" class="o-mom">☆MOM</span>
              </v-col>
              <v-col class="mt-n6" cols="12"> {{ htrItem.point }} </v-col>
              <v-col class="mb-5 mt-n6" cols="12">{{ htrItem.text }}</v-col>
            </v-row>
          </v-container>
        </v-row>
        <v-row v-if="report.selectTeam !== 'home'">
          <v-col>
            <v-img max-height="30" max-width="30" :lazy-src="lazy" :src="match.awayTeam.imageUrl" />
          </v-col>
        </v-row>
        <v-row v-if="report.selectTeam !== 'home'">
          <v-container>
            <v-row v-for="atrItem in awayTeamReportItems" :key="atrItem.id">
              <v-col cols="12" class="font-weight-bold">
                {{ atrItem.position }} {{ atrItem.shirtNumber }} {{ atrItem.player.name }}
                <span v-if="report && report.momId === atrItem.player.id" class="o-mom">☆MOM</span>
              </v-col>
              <v-col class="mt-n6" cols="12"> {{ atrItem.point }} </v-col>
              <v-col class="mb-5 mt-n6" cols="12">{{ atrItem.text }}</v-col>
            </v-row>
          </v-container>
        </v-row>
        <v-row>
          <v-col cols="12" class="font-weight-bold">総評：{{ report.summary }}</v-col>
        </v-row>
      </v-container>
    </v-card>
    <client-only>
      <v-card v-if="report" class="mt-4" outlined>
        <v-container>
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
                :color="like ? '#ff9800' : '#9e9e9e'"
                :disabled="disabledLikeButton"
                :loading="isLoadingUpdateLike"
                @click="updateLike"
              >
                <v-icon>{{ mdiThumbUp }}</v-icon>
              </v-btn>
              {{ report.likeCount }}
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-card v-if="!isLoadingReport && report && report.user.id !== 'guest'" class="mt-4" outlined>
        <ContainerLoading :is-loading="isLoadingUser" />
        <v-container v-if="!isLoadingUser && user && report">
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
                v-if="showFollowButton"
                :follow="follow"
                :is-loading="isLoadingUpdateFollow"
                :user-id="user.id"
                @click="updateFollow"
              />
            </v-col>
            <v-col cols="12" class="mt-n4">マイチーム：{{ user.team.name }}</v-col>
            <v-col cols="12" class="o-greet mt-n4">{{ user.greet }}</v-col>
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
            <v-col class="o-comment mt-n4 pl-11">{{ comment.text }}</v-col>
          </v-row>
          <v-row>
            <ColUserImageName :image-url="commentUser.imageUrl" :name="commentUser.name" />
          </v-row>
          <v-row>
            <v-col cols="12"> <Textarea v-model="newComment" :maxlength="140" /></v-col>
            <v-col cols="6" class="mt-n8">
              <ButtonSubmit
                :disabled="newComment.length === 0"
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
        @guest="createComment"
      />
    </client-only>
    <DialogShare
      :dialog="dialogShare"
      @facebook="share('facebook')"
      @hide="hideDialogShare"
      @twitter="share('twitter')"
    />
  </v-container>
</template>

<script lang="ts">
/** check */
import { defineComponent, onBeforeMount, useFetch, useMeta } from '@nuxtjs/composition-api'
import { mdiFacebook, mdiThumbUp, mdiTwitter } from '@mdi/js'
import useShow from '@/composables/reports/useShow'
import ButtonFollow from '@/components/molecules/ButtonFollow.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import ColUserImageName from '@/components/organisms/ColUserImageName.vue'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import ContainerReportTable from '@/components/organisms/ContainerReportTable.vue'
import RowMatchHeader from '@/components/organisms/RowMatchHeader.vue'
import Textarea from '@/components/molecules/Textarea.vue'

export default defineComponent({
  name: 'ReportShow',

  components: {
    ButtonFollow,
    ButtonSubmit,
    ColUserImageName,
    ContainerLoading,
    ContainerReportTable,
    DialogConfirmLogin: () => import('@/components/organisms/DialogConfirmLogin.vue'),
    DialogShare: () => import('@/components/organisms/DialogShare.vue'),
    RowMatchHeader,
    Textarea
  },

  setup() {
    const {
      awayTeamReportItems,
      comments,
      commentUser,
      commonSetUp,
      confirmLogin,
      createComment,
      csrSetUp,
      dialogShare,
      disabledLikeButton,
      follow,
      hideDialogShare,
      homeTeamReportItems,
      isDialog,
      isLoadingComments,
      isLoadingNewComment,
      isLoadingReport,
      isLoadingSameMatchReports,
      isLoadingUpdateFollow,
      isLoadingUpdateLike,
      isLoadingUser,
      like,
      match,
      newComment,
      report,
      sameMatchReports,
      share,
      showDialogShare,
      showFollowButton,
      ssrSetUp,
      updateFollow,
      updateLike,
      user
    } = useShow()
    const lazy = require('@/assets/lazy.png')

    useFetch(async () => {
      process.server ? await ssrSetUp() : await csrSetUp()
    })

    onBeforeMount(() => {
      commonSetUp()
      showDialogShare()
    })

    useMeta(() => {
      const title = report.value?.title
      const date = report.value?.jstDate
      const d = `${date?.substring(0, 4)}年${date?.substring(5, 7)}月${date?.substring(8, 10)}日`
      const c = report.value?.competition.name
      const h = report.value?.homeTeam.name
      const a = report.value?.awayTeam.name
      const description = `${d}に開催された、${c} ${h} vs ${a} 戦の選手採点です。サッカーの選手採点共有サービス、フットレポがお届けします。`
      return {
        title: `${title} - フットレポ`,
        meta: [
          { hid: 'description', property: 'description', content: description },
          { hid: 'keywords', property: 'keywords', content: `サッカー,選手採点,${h},${a}` },
          { hid: 'og:title', property: 'og:title', content: `${title} - フットレポ` },
          { hid: 'og:description', property: 'og:description', content: description }
        ]
      }
    })

    return {
      awayTeamReportItems,
      comments,
      commentUser,
      confirmLogin,
      createComment,
      dialogShare,
      disabledLikeButton,
      follow,
      hideDialogShare,
      homeTeamReportItems,
      isDialog,
      isLoadingComments,
      isLoadingNewComment,
      isLoadingReport,
      isLoadingSameMatchReports,
      isLoadingUpdateFollow,
      isLoadingUpdateLike,
      isLoadingUser,
      lazy,
      like,
      match,
      mdiFacebook,
      mdiThumbUp,
      mdiTwitter,
      newComment,
      report,
      sameMatchReports,
      share,
      showFollowButton,
      updateFollow,
      updateLike,
      user
    }
  },
  head: {}
})
</script>

<style lang="scss" scoped>
.o-private {
  color: #1a237e;
  background-color: #{$light-indigo};
  border-radius: 5px;
  text-align: center;
}
.o-mom {
  background: linear-gradient(transparent 70%, yellow 70%);
}
.o-comment {
  border-bottom: 1px solid #{$light-indigo};
}
.o-greet {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
