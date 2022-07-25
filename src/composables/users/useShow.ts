/** check */
import { ref, Ref, useRoute, useRouter, watch } from '@nuxtjs/composition-api'
import type { QueryDocumentSnapshot } from 'firebase/firestore'
import { deleteReport, fetchUserLikeReports, fetchUserReports } from '@/db/reports'
import { fetchIsFollow, fetchFollowers, fetchFollows, fetchUser, doFollow } from '@/db/users'
import useLoginUser from '@/utils/useLoginUser'
import useSnackbar from '@/utils/useSnackbar'
const perPage = 10

/** common functions */
const readMyReports = async (
  userId: string,
  lastVisibleMyReport: Ref<QueryDocumentSnapshot<Report> | null>,
  hasNextMyReports: Ref<boolean>,
  myReports: Ref<Report[]>
): Promise<void> => {
  const { resReports, resLastVisible } = await fetchUserReports(userId, lastVisibleMyReport.value)
  if (resReports.length < perPage) hasNextMyReports.value = false
  myReports.value = myReports.value.concat(resReports)
  lastVisibleMyReport.value = resLastVisible
}
const readFollows = async (
  userId: string,
  lastVisibleFollow: Ref<QueryDocumentSnapshot<Follower> | null>,
  loginUser: LoginUser | null,
  hasNextFollows: Ref<boolean>,
  follows: Ref<Follower[]>
): Promise<void> => {
  const { resFollows, resLastVisible } = await fetchFollows(
    userId,
    lastVisibleFollow.value,
    loginUser
  )
  if (resFollows.length < perPage) hasNextFollows.value = false
  follows.value = follows.value.concat(resFollows)
  lastVisibleFollow.value = resLastVisible
}
const readFollowers = async (
  userId: string,
  lastVisibleFollower: Ref<QueryDocumentSnapshot<Follower> | null>,
  loginUser: LoginUser | null,
  hasNextFollowers: Ref<boolean>,
  followers: Ref<Follower[]>
): Promise<void> => {
  const { resFollowers, resLastVisible } = await fetchFollowers(
    userId,
    lastVisibleFollower.value,
    loginUser
  )
  if (resFollowers.length < perPage) hasNextFollowers.value = false
  followers.value = followers.value.concat(resFollowers)
  lastVisibleFollower.value = resLastVisible
}
const readLikeReports = async (
  userId: string,
  lastVisibleLike: Ref<QueryDocumentSnapshot<Like> | null>,
  hasNextLikeReports: Ref<boolean>,
  likeReports: Ref<Report[]>
): Promise<void> => {
  const { resReports, resLastVisible } = await fetchUserLikeReports(userId, lastVisibleLike.value)
  if (resReports.length < perPage) hasNextLikeReports.value = false
  likeReports.value = likeReports.value.concat(resReports)
  lastVisibleLike.value = resLastVisible
}

const useShow = () => {
  const route = useRoute()
  const router = useRouter()
  const { loginUser } = useLoginUser()
  const { openSnackbar } = useSnackbar()

  /** setUp */
  const user = ref<User | null>(null)
  const follow = ref(false)
  const myReports = ref<Report[]>([])
  const lastVisibleMyReport = ref<QueryDocumentSnapshot<Report> | null>(null)
  const hasNextMyReports = ref(true)
  const isLoadingUser = ref(false)
  const isLoadingReports = ref(false)
  const setUp = async (): Promise<void> => {
    try {
      isLoadingUser.value = true
      const userId = route.value.params.id
      user.value = await fetchUser(userId)
      if (loginUser.value && user.value && loginUser.value.uid !== userId) {
        follow.value = await fetchIsFollow(loginUser.value.uid, user.value.id)
      }
      isLoadingUser.value = false
      isLoadingReports.value = true
      await readMyReports(userId, lastVisibleMyReport, hasNextMyReports, myReports)
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
    if (!user.value || user.value.followCount === 0) return
    try {
      isDialogFollows.value = true
      if (follows.value.length === 0) {
        isLoadingFollows.value = true
        await readFollows(
          user.value.id,
          lastVisibleFollow,
          loginUser.value,
          hasNextFollows,
          follows
        )
      }
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoadingFollows.value = false
    }
  }
  const hideFollowsDialog = (): void => {
    isDialogFollows.value = false
  }
  const isLoadingNextFollows = ref(false)
  const readNextFollows = async (): Promise<void> => {
    if (!user.value) return
    try {
      isLoadingNextFollows.value = true
      await readFollows(user.value.id, lastVisibleFollow, loginUser.value, hasNextFollows, follows)
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。')
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
    if (!user.value || user.value.followerCount === 0) return
    try {
      isDialogFollowers.value = true
      if (followers.value.length === 0) {
        isLoadingFollowers.value = true
        await readFollowers(
          user.value.id,
          lastVisibleFollower,
          loginUser.value,
          hasNextFollowers,
          followers
        )
      }
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoadingFollowers.value = false
    }
  }
  const hideFollowersDialog = (): void => {
    isDialogFollowers.value = false
  }
  const isLoadingNextFollowers = ref(false)
  const readNextFollowers = async (): Promise<void> => {
    if (!user.value) return
    try {
      isLoadingNextFollowers.value = true
      await readFollowers(
        user.value.id,
        lastVisibleFollower,
        loginUser.value,
        hasNextFollowers,
        followers
      )
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoadingNextFollowers.value = false
    }
  }

  /** follow */
  const isLoadingUpdateFollow = ref(false)
  const updateFollow = async (userId: string, type: 'profile' | 'dialog'): Promise<void> => {
    if (!loginUser.value) return
    try {
      isLoadingUpdateFollow.value = true
      await doFollow(loginUser.value.uid, userId)
      /** adjust count */
      if (type === 'dialog') {
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
      } else {
        follow.value = !follow.value
        if (user.value) user.value.followerCount += follow.value ? 1 : -1
      }
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoadingUpdateFollow.value = false
    }
  }

  /** reports tab */
  const tab = ref('Mine')
  const tabs = ['Mine', 'Like']
  const changeTab = (index: number): void => {
    tab.value = tabs[index]
  }
  const likeReports = ref<Report[]>([])
  const lastVisibleLike = ref<QueryDocumentSnapshot<Like> | null>(null)
  const hasNextLikeReports = ref(true)
  const isLoadingChangeReports = ref(false)
  const readFirstLikeReports = async (): Promise<void> => {
    if (!user.value || tab.value !== 'Like' || likeReports.value.length > 0) return
    try {
      isLoadingChangeReports.value = true
      await readLikeReports(user.value.id, lastVisibleLike, hasNextLikeReports, likeReports)
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoadingChangeReports.value = false
    }
  }
  watch(tab, () => readFirstLikeReports())
  const isLoadingNextReports = ref(false)
  const readNextReports = async (): Promise<void> => {
    if (!user.value) return
    try {
      isLoadingNextReports.value = true
      if (tab.value === 'Mine') {
        await readMyReports(user.value.id, lastVisibleMyReport, hasNextMyReports, myReports)
      } else {
        await readLikeReports(user.value.id, lastVisibleLike, hasNextLikeReports, likeReports)
      }
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoadingNextReports.value = false
    }
  }

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
  const trushReport = () => {
    if (!targetReport.value || !loginUser.value) return
    try {
      isLoadingReportDelete.value = true
      const reportId = targetReport.value.id
      deleteReport(reportId, loginUser.value.uid)
      myReports.value = myReports.value.filter((r) => r.id !== reportId)
      if (user.value) user.value.reportCount -= 1
      openSnackbar('success', '削除に成功しました。')
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。')
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
  }
}

export default useShow
