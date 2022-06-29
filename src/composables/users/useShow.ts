import { ref, Ref } from '@nuxtjs/composition-api'
import type { QueryDocumentSnapshot } from 'firebase/firestore'
import { fetchUserLikeReports, fetchUserReports, deleteReport } from '@/db/reports'
import { fetchFollow, fetchFollowers, fetchFollows, fetchUser, putFollow } from '@/db/users'
import useLoginUser from '@/utils/useLoginUser'
import useSnackbar from '@/utils/useSnackbar'
const useShow = () => {
  const user: Ref<User | null> = ref(null)
  const reports: Ref<Report[]> = ref([])
  const { loginUser } = useLoginUser()
  const { openSnackbar } = useSnackbar()

  const isLoadingUser = ref(false)
  const isLoadingReports = ref(false)
  const follow = ref(false)
  const setUp = async (userId: string): Promise<'success' | 'failure'> => {
    try {
      isLoadingUser.value = true
      user.value = await fetchUser(userId)
      if (loginUser.value && user.value) {
        follow.value = await fetchFollow(loginUser.value.uid, user.value.id)
      }
      isLoadingUser.value = false

      isLoadingReports.value = true
      reports.value = await fetchUserReports(userId)
      isLoadingReports.value = false

      return 'success'
    } catch (error) {
      console.log(error)
      return 'failure'
    } finally {
      isLoadingUser.value = false
      isLoadingReports.value = false
    }
  }

  const tab = ref('Mine')
  const tabs = ['Mine', 'Like']
  const changeTab = (index: number): void => {
    tab.value = tabs[index]
  }
  const isLoadingChangeReports = ref(false)
  const changeReports = async (): Promise<'success' | 'failure'> => {
    try {
      isLoadingChangeReports.value = true
      reports.value =
        tab.value === 'Mine'
          ? await fetchUserReports(user.value?.id!)
          : await fetchUserLikeReports(user.value?.id!)
      return 'success'
    } catch (error) {
      console.log(error)
      return 'failure'
    } finally {
      isLoadingChangeReports.value = false
    }
  }

  const isDialogDelete = ref(false)
  const targetReport: Ref<Report | null> = ref(null)
  const showDeleteDialog = (report: Report): void => {
    isDialogDelete.value = true
    targetReport.value = report
  }
  const hideDeleteDialog = (): void => {
    isDialogDelete.value = false
    targetReport.value = null
  }
  const isLoadingDel = ref(false)
  const del = async (): Promise<'success' | 'failure'> => {
    try {
      isLoadingDel.value = true
      await deleteReport(targetReport.value?.id!, loginUser.value?.uid!)
      reports.value = reports.value.filter((r) => r.id !== targetReport.value?.id!)
      return 'success'
    } catch (error) {
      console.log(error)
      return 'failure'
    } finally {
      hideDeleteDialog()
      isLoadingDel.value = false
    }
  }

  /* follows dialog */
  const follows: Ref<Follower[]> = ref([])
  const followsLastVisible: Ref<QueryDocumentSnapshot<Follower> | null> = ref(null)
  const isDialogFollow = ref(false)
  const isLoadingFollow = ref(false)
  const hasNextFollows = ref(true)
  const showFollowsDialog = (): void => {
    isDialogFollow.value = true
  }
  const hideFollowsDialog = (): void => {
    isDialogFollow.value = false
  }
  const readFirstFollows = async (): Promise<'success' | 'failure'> => {
    try {
      showFollowsDialog()
      if (follows.value.length === 0) {
        isLoadingFollow.value = true
        const { resFollows, resLastVisible } = await fetchFollows(
          user.value?.id!,
          followsLastVisible.value,
          loginUser.value
        )
        if (resFollows.length === 0) hasNextFollows.value = false
        follows.value = follows.value.concat(resFollows)
        followsLastVisible.value = resLastVisible
      }
      return 'success'
    } catch (error) {
      console.log(error)
      return 'failure'
    } finally {
      isLoadingFollow.value = false
    }
  }
  const isLoadingNextFollows = ref(false)
  const readNextFollows = async (): Promise<'success' | 'failure'> => {
    try {
      isLoadingNextFollows.value = true
      const { resFollows, resLastVisible } = await fetchFollows(
        user.value?.id!,
        followsLastVisible.value,
        loginUser.value
      )
      if (resFollows.length === 0) hasNextFollows.value = false
      follows.value = follows.value.concat(resFollows)
      followsLastVisible.value = resLastVisible
      return 'success'
    } catch (error) {
      console.log(error)
      return 'failure'
    } finally {
      isLoadingNextFollows.value = false
    }
  }
  const blockDoubleClick = ref(false)
  const updateFollow = async (
    userId: string,
    type: 'profile' | 'dialog'
  ): Promise<'success' | 'failure' | undefined> => {
    try {
      if (blockDoubleClick.value) return
      blockDoubleClick.value = true
      if (type === 'dialog') {
        const index = follows.value.findIndex((f) => f.user.id === userId)
        follows.value[index].follow = !follows.value[index].follow
        if (loginUser.value && user.value && loginUser.value.uid === user.value.id) {
          user.value.followCount += follows.value[index].follow === true ? 1 : -1
        }
      } else {
        follow.value = !follow.value
      }
      await putFollow(userId)
      return 'success'
    } catch (error) {
      console.log(error)
      return 'failure'
    } finally {
      blockDoubleClick.value = false
    }
  }

  /* followers dialog */
  const followers = ref<Follower[]>([])
  const lastVisibleFollower = ref<QueryDocumentSnapshot<Follower> | null>(null)
  const hasNextFollowers = ref(true)
  const isDialogFollowers = ref(false)
  const isLoadingFollowers = ref(false)
  const showFollowersDialog = async () => {
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
      openSnackbar('failure', 'フォロワーの獲得に失敗しました。')
    } finally {
      isLoadingFollowers.value = false
    }
  }
  const hideFollowersDialog = () => {
    isDialogFollowers.value = false
  }
  const isLoadingNextFollowers = ref(false)
  const readNextFollowers = async () => {
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

  return {
    user,
    reports,
    isLoadingUser,
    isLoadingReports,
    setUp,
    isDialogDelete,
    targetReport,
    showDeleteDialog,
    hideDeleteDialog,
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
    hideFollowsDialog,
    readNextFollows,
    isLoadingNextFollows,
    hasNextFollows,
    updateFollow,
    follow,
    followers,
    hasNextFollowers,
    isDialogFollowers,
    isLoadingFollowers,
    showFollowersDialog,
    hideFollowersDialog,
    isLoadingNextFollowers,
    readNextFollowers
  }
}

export default useShow
