import { ref } from '@nuxtjs/composition-api'
import { toStoreUsers } from '@/db/users'
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
        await toStoreUsers(users)
      }
    } catch (error) {
      console.log(error)
      openSnackbar('failure', 'ユーザーの取得に失敗しました。')
    } finally {
      isLoadingSetUp.value = false
    }
  }

  return { isLoadingSetUp, setUp }
}

export default useIndex
