<template>
  <v-container>
    <v-card outlined>
      <ContainerLoading :is-loading="isLoadingUser" />
      <v-container v-if="!isLoadingUser && user">
        <v-row>
          <ColUserImageName
            :cols="7"
            :image-url="user.imageUrl"
            :md="9"
            :name="user.name"
            :sm="9"
          />
          <v-col v-if="loginUser && loginUser.uid === user.id" cols="5" sm="3">
            <ButtonOutlined :text="'編集'" @click="pushToUserEdit" />
          </v-col>
          <v-col v-else cols="5" sm="3">
            <ButtonFollow
              :follow="follow"
              :is-loading="isLoadingUpdateFollow"
              :user-id="user.id"
              @click="(userId) => updateFollow(userId, 'profile')"
            />
          </v-col>
          <v-col cols="12" class="mt-n4">マイチーム：{{ user.team.name }}</v-col>
          <v-col cols="12" class="greet mt-n4">{{ user.greet }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="text-center">
            <v-icon large>mdi-text-box-edit</v-icon>
            <div>投稿</div>
            <div>{{ user.reportCount }} 件</div>
          </v-col>
          <v-col
            cols="4"
            class="text-center"
            :class="{ follow: user.followCount !== 0 }"
            @click="showFollowsDialog"
          >
            <v-icon large>mdi-account-arrow-right</v-icon>
            <div>フォロー</div>
            <div>{{ user.followCount }} 件</div>
          </v-col>
          <v-col
            cols="4"
            class="text-center"
            :class="{ follow: user.followerCount !== 0 }"
            @click="showFollowersDialog"
          >
            <v-icon large>mdi-account-arrow-left</v-icon>
            <div>フォロワー</div>
            <div>{{ user.followerCount }} 件</div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card v-if="!isLoadingUser && user" class="mt-4" outlined>
      <ContainerLoading :is-loading="isLoadingReports" />
      <ContainerReportTable
        v-if="!isLoadingReports"
        :action-flg="loginUser && loginUser.uid === user.id"
        :is-loading="isLoadingChangeReports"
        :reports="tab === 'Mine' ? myReports : likeReports"
        :tabs="tabs"
        @change-tab="changeTab"
        @delete="showDeleteDialog"
      />
      <v-container>
        <v-row justify="center">
          <v-col cols="10">
            <ButtonSubmit
              :disabled="tab === 'Mine' ? !hasNextMyReports : !hasNextLikeReports"
              :icon="'mdi-page-next'"
              :loading="isLoadingNextReports"
              :text="'もっと読み込む'"
              @click="readNextReports"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <DialogDelete
      :is-dialog="isDialogDelete"
      :is-loading="isLoadingReportDelete"
      :report="targetReport"
      @close="hideDeleteDialog"
      @delete="trushReport"
    />
    <DialogFollowers
      :follwers="follows"
      :has-next="hasNextFollows"
      :is-dialog="isDialogFollows"
      :is-loading="isLoadingFollows"
      :is-loading-button="isLoadingNextFollows"
      :is-loading-update-follow="isLoadingUpdateFollow"
      :uid="loginUser ? loginUser.uid : null"
      @close="hideFollowsDialog"
      @follow="(userId) => updateFollow(userId, 'dialog')"
      @next="readNextFollows"
    />
    <DialogFollowers
      :follwers="followers"
      :has-next="hasNextFollowers"
      :is-dialog="isDialogFollowers"
      :is-loading="isLoadingFollowers"
      :is-loading-button="isLoadingNextFollowers"
      :is-loading-update-follow="isLoadingUpdateFollow"
      :uid="loginUser ? loginUser.uid : null"
      @close="hideFollowersDialog"
      @follow="(userId) => updateFollow(userId, 'dialog')"
      @next="readNextFollowers"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useShow from '@/composables/users/useShow'
import useLoginUser from '@/utils/useLoginUser'
import ButtonFollow from '@/components/molecules/ButtonFollow.vue'
import ButtonOutlined from '@/components/molecules/ButtonOutlined.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import ColUserImageName from '@/components/organisms/ColUserImageName.vue'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import ContainerReportTable from '@/components/organisms/ContainerReportTable.vue'
import DialogDelete from '@/components/molecules/DialogDelete.vue'
import DialogFollowers from '@/components/organisms/DialogFollowers.vue'

export default defineComponent({
  name: 'UserShow',

  components: {
    ButtonFollow,
    ButtonOutlined,
    ButtonSubmit,
    ColUserImageName,
    ContainerLoading,
    ContainerReportTable,
    DialogDelete,
    DialogFollowers
  },

  setup() {
    const {
      changeTab,
      follow,
      followers,
      follows,
      hasNextFollowers,
      hasNextFollows,
      hasNextLikeReports,
      hasNextMyReports,
      hideDeleteDialog,
      hideFollowersDialog,
      hideFollowsDialog,
      isDialogDelete,
      isDialogFollowers,
      isDialogFollows,
      isLoadingChangeReports,
      isLoadingFollowers,
      isLoadingFollows,
      isLoadingNextFollowers,
      isLoadingNextFollows,
      isLoadingNextReports,
      isLoadingReportDelete,
      isLoadingReports,
      isLoadingUpdateFollow,
      isLoadingUser,
      likeReports,
      myReports,
      pushToUserEdit,
      readNextFollowers,
      readNextFollows,
      readNextReports,
      setUp,
      showDeleteDialog,
      showFollowersDialog,
      showFollowsDialog,
      tab,
      tabs,
      targetReport,
      trushReport,
      updateFollow,
      user
    } = useShow()
    const { loginUser } = useLoginUser()

    setUp()

    return {
      changeTab,
      follow,
      followers,
      follows,
      hasNextFollowers,
      hasNextFollows,
      hasNextLikeReports,
      hasNextMyReports,
      hideDeleteDialog,
      hideFollowersDialog,
      hideFollowsDialog,
      isDialogDelete,
      isDialogFollowers,
      isDialogFollows,
      isLoadingChangeReports,
      isLoadingFollowers,
      isLoadingFollows,
      isLoadingNextFollowers,
      isLoadingNextFollows,
      isLoadingNextReports,
      isLoadingReportDelete,
      isLoadingReports,
      isLoadingUpdateFollow,
      isLoadingUser,
      likeReports,
      loginUser,
      myReports,
      pushToUserEdit,
      readNextFollowers,
      readNextFollows,
      readNextReports,
      setUp,
      showDeleteDialog,
      showFollowersDialog,
      showFollowsDialog,
      tab,
      tabs,
      targetReport,
      trushReport,
      updateFollow,
      user
    }
  }
})
</script>

<style lang="scss" scoped>
.follow {
  &:hover {
    background: #eceff1;
    opacity: 0.8;
    cursor: pointer;
  }
}
.greet {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
