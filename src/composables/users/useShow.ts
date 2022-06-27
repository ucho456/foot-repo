import { ref, Ref } from '@nuxtjs/composition-api'
import { fetchUserLikeReports, fetchUserReports, deleteReport } from '@/db/reports'
import { fetchFollows, fetchUser } from '@/db/users'
import useLoginUser from '@/utils/useLoginUser'

const useShow = () => {
  const user: Ref<User | null> = ref(null)
  const reports: Ref<Report[]> = ref([])
  const { loginUser } = useLoginUser()

  const isLoadingUser = ref(false)
  const isLoadingReports = ref(false)
  const setUp = async (userId: string): Promise<'success' | 'failure'> => {
    try {
      isLoadingUser.value = true
      user.value = await fetchUser(userId)
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

  /* follow */
  const follows: Ref<Follower[]> = ref([])
  const isDialogFollow = ref(false)
  const isLoadingFollow = ref(false)
  const readFollows = async (): Promise<'success' | 'failure'> => {
    try {
      isLoadingFollow.value = true
      isDialogFollow.value = true
      const resFollows = await fetchFollows(user.value?.id!)
      follows.value = follows.value.concat(resFollows)
      return 'success'
    } catch (error) {
      console.log(error)
      return 'failure'
    } finally {
      isLoadingFollow.value = false
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
    readFollows
  }
}

export default useShow
