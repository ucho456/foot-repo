import { ref, useRoute, useRouter, watch } from '@nuxtjs/composition-api'
import type { QueryDocumentSnapshot } from 'firebase/firestore'
import { deleteReport, fetchUserLikeReports, fetchUserReports } from '@/db/reports'
import { fetchFollow, fetchFollowers, fetchFollows, fetchUser, putFollow } from '@/db/users'
import useLoginUser from '@/utils/useLoginUser'
import useSnackbar from '@/utils/useSnackbar'

const useShow = () => {
  const route = useRoute()
  const router = useRouter()
  const { loginUser } = useLoginUser()
  const { openSnackbar } = useSnackbar()

  /** setUp */
  const user = ref<User | null>(null)
  const follow = ref(false)
  const reports = ref<Report[]>([])
  const isLoadingUser = ref(false)
  const isLoadingReports = ref(false)
  const setUp = async (): Promise<void> => {
    try {
      isLoadingUser.value = true
      const userId = route.value.params.id
      user.value = await fetchUser(userId)
      if (loginUser.value && user.value && loginUser.value.uid !== userId) {
        follow.value = await fetchFollow(loginUser.value.uid, user.value.id)
      }
      isLoadingUser.value = false

      isLoadingReports.value = true
      reports.value = await fetchUserReports(userId)
      isLoadingReports.value = false
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoadingUser.value = false
      isLoadingReports.value = false
    }
  }

  /** router */
  const pushToUserEdit = (): void => {
    router.push('/users/edit')
  }

  /** follows dialog */
  const follows = ref<Follower[]>([])
  const lastVisibleFollow = ref<QueryDocumentSnapshot<Follower> | null>(null)
  const hasNextFollows = ref(true)
  const isDialogFollows = ref(false)
  const isLoadingFollows = ref(false)
  const showFollowsDialog = async (): Promise<void> => {
    try {
      if (user.value?.followCount === 0) return
      isDialogFollows.value = true
      if (follows.value.length === 0) {
        isLoadingFollows.value = true
        const { resFollows, resLastVisible } = await fetchFollows(
          user.value?.id!,
          lastVisibleFollow.value,
          loginUser.value
        )
        if (resFollows.length === 0) hasNextFollows.value = false
        follows.value = follows.value.concat(resFollows)
        lastVisibleFollow.value = resLastVisible
      }
    } catch (error) {
      console.log(error)
      openSnackbar('failure', 'フォローの取得に失敗しました。')
    } finally {
      isLoadingFollows.value = false
    }
  }
  const hideFollowsDialog = (): void => {
    isDialogFollows.value = false
  }
  const isLoadingNextFollows = ref(false)
  const readNextFollows = async (): Promise<void> => {
    try {
      isLoadingNextFollows.value = true
      const { resFollows, resLastVisible } = await fetchFollows(
        user.value?.id!,
        lastVisibleFollow.value,
        loginUser.value
      )
      if (resFollows.length === 0) hasNextFollows.value = false
      follows.value = follows.value.concat(resFollows)
      lastVisibleFollow.value = resLastVisible
    } catch (error) {
      console.log(error)
      openSnackbar('failure', 'フォローの取得に失敗しました。')
    } finally {
      isLoadingNextFollows.value = false
    }
  }

  /** followers dialog */
  const followers = ref<Follower[]>([])
  const lastVisibleFollower = ref<QueryDocumentSnapshot<Follower> | null>(null)
  const hasNextFollowers = ref(true)
  const isDialogFollowers = ref(false)
  const isLoadingFollowers = ref(false)
  const showFollowersDialog = async (): Promise<void> => {
    try {
      if (user.value?.followerCount === 0) return
      isDialogFollowers.value = true
      if (followers.value.length === 0) {
        isLoadingFollowers.value = true
        const { resFollowers, resLastVisible } = await fetchFollowers(
          user.value?.id!,
          lastVisibleFollower.value,
          loginUser.value
        )
        if (resFollowers.length === 0) hasNextFollowers.value = false
        followers.value = followers.value.concat(resFollowers)
        lastVisibleFollower.value = resLastVisible
      }
    } catch (error) {
      console.log(error)
      openSnackbar('failure', 'フォロワーの取得に失敗しました。')
    } finally {
      isLoadingFollowers.value = false
    }
  }
  const hideFollowersDialog = (): void => {
    isDialogFollowers.value = false
  }
  const isLoadingNextFollowers = ref(false)
  const readNextFollowers = async (): Promise<void> => {
    try {
      isLoadingNextFollowers.value = true
      const { resFollowers, resLastVisible } = await fetchFollowers(
        user.value?.id!,
        lastVisibleFollower.value,
        loginUser.value
      )
      if (resFollowers.length === 0) hasNextFollowers.value = false
      followers.value = followers.value.concat(resFollowers)
      lastVisibleFollower.value = resLastVisible
    } catch (error) {
      console.log(error)
      openSnackbar('failure', 'フォロワーの取得に失敗しました。')
    } finally {
      isLoadingNextFollowers.value = false
    }
  }

  /** follow */
  const adjustCount = (userId: string): void => {
    if (follows.value.length > 0) {
      const followIndex = follows.value.findIndex((f) => f.user.id === userId)
      if (followIndex !== -1) {
        follows.value[followIndex].follow = !follows.value[followIndex].follow
        if (loginUser.value && user.value && loginUser.value.uid === user.value.id) {
          user.value.followCount += follows.value[followIndex].follow === true ? 1 : -1
        }
      }
    }
    if (followers.value.length > 0) {
      const followerIndex = followers.value.findIndex((f) => f.user.id === userId)
      if (followerIndex !== -1) {
        followers.value[followerIndex].follow = !followers.value[followerIndex].follow
        if (loginUser.value && user.value && loginUser.value.uid === user.value.id) {
          user.value.followerCount += followers.value[followerIndex].follow === true ? 1 : -1
        }
      }
    }
  }
  const blockDoubleClick = ref(false)
  const updateFollow = async (userId: string, type: 'profile' | 'dialog'): Promise<void> => {
    try {
      if (blockDoubleClick.value) return
      blockDoubleClick.value = true
      if (type === 'dialog') {
        adjustCount(userId)
      } else {
        follow.value = !follow.value
        if (user.value) user.value.followerCount += follow.value ? 1 : -1
      }
      await putFollow(userId)
    } catch (error) {
      console.log(error)
      openSnackbar('failure', 'フォローの更新に失敗しました。')
    } finally {
      blockDoubleClick.value = false
    }
  }

  /** reports tab */
  const tab = ref('Mine')
  const tabs = ['Mine', 'Like']
  const changeTab = (index: number): void => {
    tab.value = tabs[index]
  }
  const isLoadingChangeReports = ref(false)
  const changeReports = async (): Promise<void> => {
    try {
      isLoadingChangeReports.value = true
      reports.value =
        tab.value === 'Mine'
          ? await fetchUserReports(user.value?.id!)
          : await fetchUserLikeReports(user.value?.id!)
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '選手採点の取得に失敗しました。')
    } finally {
      isLoadingChangeReports.value = false
    }
  }
  watch(tab, () => changeReports())

  /** report delete */
  const isDialogDelete = ref(false)
  const targetReport = ref<Report | null>(null)
  const showDeleteDialog = (report: Report): void => {
    isDialogDelete.value = true
    targetReport.value = report
  }
  const hideDeleteDialog = (): void => {
    isDialogDelete.value = false
    targetReport.value = null
  }
  const isLoadingReportDelete = ref(false)
  const trushReport = async (): Promise<void> => {
    try {
      isLoadingReportDelete.value = true
      await deleteReport(targetReport.value?.id!, loginUser.value?.uid!)
      reports.value = reports.value.filter((r) => r.id !== targetReport.value?.id!)
      if (user.value) user.value.reportCount -= 1
      openSnackbar('success', '削除に成功しました。')
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '削除に失敗しました。')
    } finally {
      hideDeleteDialog()
      isLoadingReportDelete.value = false
    }
  }

  return {
    changeTab,
    follow,
    followers,
    follows,
    hasNextFollowers,
    hasNextFollows,
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
    isLoadingReportDelete,
    isLoadingReports,
    isLoadingUser,
    pushToUserEdit,
    readNextFollowers,
    readNextFollows,
    reports,
    setUp,
    showDeleteDialog,
    showFollowersDialog,
    showFollowsDialog,
    tabs,
    targetReport,
    trushReport,
    updateFollow,
    user
  }
}

export default useShow
