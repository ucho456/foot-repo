/** check */
import { computed, ref } from '@nuxtjs/composition-api'
import { doFollow, toStoreUsers } from '@/db/users'
import useLoginUser from '@/utils/useLoginUser'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'

const useIndex = () => {
  const { loginUser } = useLoginUser()
  const { openSnackbar } = useSnackbar()
  const { users } = useStore()

  /** setUp */
  const isLoadingSetUp = ref(false)
  const setUp = async () => {
    try {
      isLoadingSetUp.value = true
      if (users.data.length === 0) await toStoreUsers(users, loginUser.value)
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoadingSetUp.value = false
    }
  }

  /** next users */
  const isLoadingNextUsers = ref(false)
  const readNextUsers = async (): Promise<void> => {
    try {
      isLoadingNextUsers.value = true
      await toStoreUsers(users, loginUser.value)
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoadingNextUsers.value = false
    }
  }

  /** search */
  const isDialog = ref(false)
  const showDialog = (): void => {
    isDialog.value = true
  }
  const hideDialog = (): void => {
    isDialog.value = false
  }
  const inputCompetitionId = (competitionId: string): void => {
    users.searchOption.teamId = ''
    users.searchOption.competitionId = competitionId
  }
  const inputTeamId = (teamId: string): void => {
    users.searchOption.teamId = teamId
  }
  const search = async (): Promise<void> => {
    try {
      isLoadingSetUp.value = true
      hideDialog()
      users.data = []
      users.lastVisible = null
      users.hasNext = true
      await toStoreUsers(users, loginUser.value)
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoadingSetUp.value = false
    }
  }

  /** follow */
  const isLoadingUpdateFollowUserId = ref('')
  const isLoadingUpdateFollowTarget = computed(() => (userId: string) => {
    return userId === isLoadingUpdateFollowUserId.value
  })
  const isDisabledUpdateFollow = computed(() => (userId: string) => {
    if (isLoadingUpdateFollowUserId.value === '') return false
    return userId !== isLoadingUpdateFollowUserId.value
  })
  const updateFollow = async (userId: string): Promise<void> => {
    if (!loginUser.value) return
    try {
      isLoadingUpdateFollowUserId.value = userId
      await doFollow(loginUser.value.uid, userId)
      const index = users.data.findIndex((u) => u.id === userId)
      users.data[index].follow = !users.data[index].follow
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoadingUpdateFollowUserId.value = ''
    }
  }

  return {
    hideDialog,
    inputCompetitionId,
    inputTeamId,
    isDialog,
    isDisabledUpdateFollow,
    isLoadingNextUsers,
    isLoadingSetUp,
    isLoadingUpdateFollowTarget,
    readNextUsers,
    search,
    setUp,
    showDialog,
    updateFollow
  }
}

export default useIndex
