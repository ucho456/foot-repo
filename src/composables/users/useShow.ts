import { ref, Ref } from '@nuxtjs/composition-api'
import type { QueryDocumentSnapshot } from 'firebase/firestore'
import { fetchUserLikeReports, fetchUserReports, deleteReport } from '@/db/reports'
import { fetchFollow, fetchFollows, fetchUser, putFollow } from '@/db/users'
import useLoginUser from '@/utils/useLoginUser'

const useShow = () => {
  const user: Ref<User | null> = ref(null)
  const reports: Ref<Report[]> = ref([])
  const { loginUser } = useLoginUser()

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
  const showDeletePopup = (report: Report): void => {
    isDialogDelete.value = true
    targetReport.value = report
  }
  const hideDeletePopup = (): void => {
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
      hideDeletePopup()
      isLoadingDel.value = false
    }
  }

  /* follows */
  const follows: Ref<Follower[]> = ref([])
  const followsLastVisible: Ref<QueryDocumentSnapshot<Follower> | null> = ref(null)
  const isDialogFollow = ref(false)
  const isLoadingFollow = ref(false)
  const hasNextFollows = ref(true)
  const showFollowsDialog = (): void => {
    isDialogFollow.value = true
  }
  const hideFollowsPopup = (): void => {
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

  return {
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
    readNextFollows,
    isLoadingNextFollows,
    hasNextFollows,
    updateFollow,
    follow
  }
}

export default useShow
