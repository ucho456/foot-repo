import { ref } from '@nuxtjs/composition-api'
import { putFollow, toStoreUsers } from '@/db/users'
import useLoginUser from '@/utils/useLoginUser'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'

const useIndex = () => {
  const { loginUser } = useLoginUser()
  const { openSnackbar } = useSnackbar()
  const { users } = useStore()

  const isLoadingSetUp = ref(false)
  const setUp = async () => {
    try {
      isLoadingSetUp.value = true
      if (users.data.length === 0) {
        // if (loginUser.value && loginUser.value.team.id) {
        //   users.searchOption.teamId = loginUser.value.team.id
        // }
        await toStoreUsers(users, loginUser.value)
      }
    } catch (error) {
      console.log(error)
      openSnackbar('failure', 'ユーザーの取得に失敗しました。')
    } finally {
      isLoadingSetUp.value = false
    }
  }

  const isLoadingUpdateFollow = ref(false)
  const updateFollow = async (userId: string): Promise<void> => {
    if (!loginUser.value) return
    try {
      isLoadingUpdateFollow.value = true
      await putFollow(loginUser.value.uid, userId)
      const index = users.data.findIndex((u) => u.id === userId)
      users.data[index].follow = !users.data[index].follow
    } catch (error) {
      console.log(error)
      openSnackbar('failure', 'フォローの更新に失敗しました。')
    } finally {
      isLoadingUpdateFollow.value = false
    }
  }

  return { isLoadingSetUp, isLoadingUpdateFollow, setUp, updateFollow }
}

export default useIndex
