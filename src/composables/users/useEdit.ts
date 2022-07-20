/** check */
import { reactive, ref, useRouter } from '@nuxtjs/composition-api'
import { putUser } from '@/db/users'
import { teamMap } from '@/db/teams'
import useLoginUser from '@/utils/useLoginUser'
import useSnackbar from '@/utils/useSnackbar'

const useEdit = () => {
  const router = useRouter()
  const { loginUser, setUpLoginUser } = useLoginUser()
  const { openSnackbar } = useSnackbar()

  const editUser: InputUser = reactive({
    id: '',
    name: '',
    imageUrl: null,
    greet: '',
    competitionId: '',
    team: { id: '', name: '' }
  })

  /** setUp */
  const setUp = (): void => {
    try {
      if (!loginUser.value) throw new Error('unauthorized access')
      editUser.id = loginUser.value.uid
      editUser.name = loginUser.value.name
      editUser.imageUrl = loginUser.value.imageUrl
      editUser.greet = loginUser.value.greet
      editUser.competitionId = loginUser.value.competitionId
      editUser.team = loginUser.value.team
    } catch (error) {
      console.log(error)
      if (error instanceof Error && error.message.includes('unauthorized access')) {
        openSnackbar('failure', '不正なアクセスが発生しました。')
        router.push('/')
      }
    }
  }

  const inputCompetitionId = (competitionId: string): void => {
    editUser.competitionId = competitionId
    editUser.team.id = ''
    editUser.team.name = ''
  }

  const isLoadingSubmit = ref(false)
  const updateUser = async (): Promise<void> => {
    if (!loginUser.value) return
    try {
      isLoadingSubmit.value = true
      if (editUser.team.id) editUser.team.name = teamMap.get(editUser.team.id)?.name!
      await putUser(editUser)
      setUpLoginUser(editUser)
      openSnackbar('success', 'プロフィールを更新しました。')
      router.push(`/users/${loginUser.value.uid}`)
    } catch (error) {
      console.log(error)
      openSnackbar('failure', 'プロフィールの更新に失敗しました。')
    } finally {
      isLoadingSubmit.value = false
    }
  }

  const back = (): void => {
    router.back()
  }

  return { back, editUser, inputCompetitionId, isLoadingSubmit, setUp, updateUser }
}

export default useEdit
