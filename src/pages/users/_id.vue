<template>
  <v-container>
    <v-card outlined>
      <ContainerLoading :is-loading="isLoadingUser" />
      <v-container v-if="user">
        <v-row>
          <v-col cols="8" sm="9" />
          <client-only>
            <v-col v-if="loginUser && loginUser.uid === user.id" cols="4" sm="3">
              <ButtonOutlined :text="'編集'" @click="pushToUserEdit" />
            </v-col>
            <v-col v-else cols="4" sm="3">
              <ButtonOutlined :text="'フォロー'" />
            </v-col>
          </client-only>
        </v-row>
        <RowUser
          :image-url="user.imageUrl"
          :image-size="60"
          :name="user.name"
          :team-name="user.team.name"
          :greet="user.greet"
        />
        <v-row>
          <v-col cols="4" class="text-center"
            ><v-icon large>mdi-text-box-edit</v-icon>
            <div>投稿</div>
            <div>{{ user.reportCount }} 件</div></v-col
          >
          <v-col cols="4" class="text-center follow" @click="clickFollows"
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
      :is-dialog="isDialogFollow"
      :is-loading="isLoadingFollow"
      :is-loading-button="isLoadingNextFollows"
      :follwers="follows"
      :uid="loginUser ? loginUser.uid : null"
      @close="hideFollowsPopup"
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
import RowUser from '@/components/organisms/RowUser.vue'
import ContainerReportTable from '@/components/organisms/ContainerReportTable.vue'
import DialogDelete from '@/components/molecules/DialogDelete.vue'
import DialogFollowers from '@/components/organisms/DialogFollowers.vue'

export default defineComponent({
  name: 'UserShow',

  components: {
    ContainerLoading,
    ButtonOutlined,
    RowUser,
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
      readNextFollows
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
    const clickFollows = async (): Promise<void> => {
      const result = await readFirstFollows()
      if (result === 'failure') openSnackbar(result, 'フォローの取得に失敗しました。')
    }
    const clickNextFollows = async (): Promise<void> => {
      const result = await readNextFollows()
      if (result === 'failure') openSnackbar(result, 'フォローの取得に失敗しました。')
    }

    return {
      clickFollows,
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
      isLoadingNextFollows
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
</style>
