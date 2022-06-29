<template>
  <v-container>
    <v-card outlined>
      <ContainerLoading :is-loading="isLoadingUser" />
      <v-container v-if="!isLoadingUser && user">
        <v-row>
          <ColUserImageName
            :cols="7"
            :sm="9"
            :md="9"
            :image-url="user.imageUrl"
            :name="user.name"
          />
          <v-col v-if="loginUser && loginUser.uid === user.id" cols="5" sm="3">
            <ButtonOutlined :text="'編集'" @click="pushToUserEdit" />
          </v-col>
          <v-col v-else cols="5" sm="3">
            <ButtonFollow
              :follow="follow"
              :user-id="user.id"
              @click="(userId) => clickFollow(userId, 'profile')"
            />
          </v-col>
          <v-col cols="12" class="mt-n4">マイチーム：{{ user.team.name }}</v-col>
          <v-col cols="12" class="greet mt-n4">{{ user.greet }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="text-center"
            ><v-icon large>mdi-text-box-edit</v-icon>
            <div>投稿</div>
            <div>{{ user.reportCount }} 件</div></v-col
          >
          <v-col
            cols="4"
            class="text-center"
            :class="{ follow: user.followCount !== 0 }"
            @click="showFollowsDialog"
            ><v-icon large>mdi-account-arrow-right</v-icon>
            <div>フォロー</div>
            <div>{{ user.followCount }} 件</div></v-col
          >
          <v-col cols="4" class="text-center follow"
            ><v-icon large>mdi-account-arrow-left</v-icon>
            <div>フォロワー</div>
            <div>{{ user.followerCount }} 件</div></v-col
          >
        </v-row>
      </v-container>
    </v-card>
    <v-card v-if="!isLoadingUser && user" class="mt-4" outlined>
      <ContainerLoading :is-loading="isLoadingReports" />
      <client-only>
        <ContainerReportTable
          v-if="!isLoadingReports"
          :action-flg="loginUser && loginUser.uid === user.id"
          :is-loading="isLoadingChangeReports"
          :reports="reports"
          :tabs="tabs"
          @delete="showDeletePopup"
          @change-tab="changeTab"
        />
      </client-only>
    </v-card>
    <DialogDelete
      :is-dialog="isDialogDelete"
      :is-loading="isLoadingDel"
      :report="targetReport"
      @close="hideDeletePopup"
      @delete="deleteReport"
    />
    <DialogFollowers
      :has-next="hasNextFollows"
      :is-dialog="isDialogFollow"
      :is-loading="isLoadingFollow"
      :is-loading-button="isLoadingNextFollows"
      :follwers="follows"
      :uid="loginUser ? loginUser.uid : null"
      @close="hideFollowsPopup"
      @follow="(userId) => clickFollow(userId, 'dialog')"
      @next="clickNextFollows"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, useRoute, useRouter, watch } from '@nuxtjs/composition-api'
import useShow from '@/composables/users/useShow'
import useLoginUser from '@/utils/useLoginUser'
import useSnackbar from '@/utils/useSnackbar'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import ButtonOutlined from '@/components/molecules/ButtonOutlined.vue'
import ButtonFollow from '@/components/molecules/ButtonFollow.vue'
import ColUserImageName from '@/components/organisms/ColUserImageName.vue'
import ContainerReportTable from '@/components/organisms/ContainerReportTable.vue'
import DialogDelete from '@/components/molecules/DialogDelete.vue'
import DialogFollowers from '@/components/organisms/DialogFollowers.vue'

export default defineComponent({
  name: 'UserShow',

  components: {
    ContainerLoading,
    ButtonOutlined,
    ButtonFollow,
    ColUserImageName,
    ContainerReportTable,
    DialogDelete,
    DialogFollowers
  },

  setup() {
    const route = useRoute()
    const router = useRouter()
    const {
      user,
      reports,
      isLoadingUser,
      isLoadingReports,
      setUp,
      isDialogDelete,
      targetReport,
      showDeletePopup,
      hideDeletePopup,
      isLoadingDel,
      del,
      tabs,
      isLoadingChangeReports,
      changeReports,
      tab,
      changeTab,
      follows,
      isDialogFollow,
      isLoadingFollow,
      readFirstFollows,
      hideFollowsPopup,
      isLoadingNextFollows,
      readNextFollows,
      hasNextFollows,
      updateFollow,
      follow
    } = useShow()
    const { loginUser } = useLoginUser()
    const { openSnackbar } = useSnackbar()

    const setUpPage = async () => {
      const userId = route.value.params.id
      const result = await setUp(userId)
      if (result === 'failure') {
        openSnackbar(result, '選手採点の取得に失敗しました。')
      }
    }
    setUpPage()

    watch(tab, async () => {
      const result = await changeReports()
      if (result === 'failure') {
        openSnackbar(result, '選手採点の取得に失敗しました。')
      }
    })

    const pushToUserEdit = (): void => {
      router.push('/users/edit')
    }

    const deleteReport = async (): Promise<void> => {
      const result = await del()
      const message = result === 'success' ? '削除に成功しました。' : '削除に失敗しました。'
      openSnackbar(result, message)
    }

    /* follows */
    const showFollowsDialog = async (): Promise<void> => {
      if (user.value?.followCount === 0) return
      const result = await readFirstFollows()
      if (result === 'failure') openSnackbar(result, 'フォローの取得に失敗しました。')
    }
    const clickNextFollows = async (): Promise<void> => {
      const result = await readNextFollows()
      if (result === 'failure') openSnackbar(result, 'フォローの取得に失敗しました。')
    }
    const clickFollow = async (userId: string, type: 'profile' | 'dialog'): Promise<void> => {
      const result = await updateFollow(userId, type)
      if (result === 'failure') openSnackbar(result, '通信エラーが発生しました。')
    }

    return {
      showFollowsDialog,
      user,
      reports,
      isLoadingUser,
      isLoadingReports,
      isDialogDelete,
      targetReport,
      showDeletePopup,
      hideDeletePopup,
      isLoadingDel,
      loginUser,
      pushToUserEdit,
      deleteReport,
      tabs,
      isLoadingChangeReports,
      changeTab,
      follows,
      isDialogFollow,
      isLoadingFollow,
      hideFollowsPopup,
      clickNextFollows,
      isLoadingNextFollows,
      hasNextFollows,
      clickFollow,
      follow
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
