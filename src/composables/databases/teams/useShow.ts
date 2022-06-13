import { ref } from '@nuxtjs/composition-api'
import { toStoreTeam } from '@/db/teams'
import useStore from '@/utils/useStore'
const useShow = () => {
  const { team } = useStore()

  const isLoading = ref(false)
  const setUp = async (teamId: string): Promise<'success' | 'failure'> => {
    try {
      isLoading.value = true
      team.data = null
      await toStoreTeam(teamId, team)
      return 'success'
    } catch {
      return 'failure'
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
