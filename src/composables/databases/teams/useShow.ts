/** check */
import { ref, useRoute } from '@nuxtjs/composition-api'
import { toStoreTeam } from '@/db/teams'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'

const useShow = () => {
  const route = useRoute()
  const { openSnackbar } = useSnackbar()
  const { team, resetTeam } = useStore()

  const isLoading = ref(false)
  const setUp = async (): Promise<void> => {
    const teamId = route.value.params.id as string
    if (team.data && team.data.id === teamId) return
    try {
      isLoading.value = true
      resetTeam()
      await toStoreTeam(teamId, team)
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoading.value = false
    }
  }

  const getAge = (birthday: string) => {
    const today = new Date()
    const birthYear = Number(birthday.substring(0, 4))
    const birthMonth = Number(birthday.substring(5, 7))
    const birthDate = Number(birthday.substring(8, 10))
    const thisYearsBirthday = new Date(today.getFullYear(), birthMonth - 1, birthDate)
    let age = today.getFullYear() - birthYear
    if (today < thisYearsBirthday) {
      age--
    }
    return `${age}歳`
  }

  return { isLoading, setUp, getAge }
}

export default useShow
