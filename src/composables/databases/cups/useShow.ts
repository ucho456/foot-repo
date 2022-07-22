/** check */
import { ref, useRoute, useRouter } from '@nuxtjs/composition-api'
import { competitionMap } from '@/db/competitions'
import { toStoreMatchSchedule } from '@/db/matches'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'

const useShow = () => {
  const route = useRoute()
  const router = useRouter()
  const { openSnackbar } = useSnackbar()
  const { cup, resetCup } = useStore()

  /** setUp */
  const isLoadingMatches = ref(false)
  const setUp = async (): Promise<void> => {
    const competitionId = route.value.params.id as string
    if (cup.competitionId === competitionId) return
    try {
      resetCup()
      cup.name = competitionMap.get(competitionId)?.name!
      cup.competitionId = competitionId
      const today = new Date()
      cup.season =
        competitionId === 'World-Cup' || today.getMonth() >= 7
          ? String(today.getFullYear())
          : String(today.getFullYear() - 1)
      isLoadingMatches.value = true
      const thisMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`
      cup.yearMonth = thisMonth
      await toStoreMatchSchedule(cup)
      isLoadingMatches.value = false
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoadingMatches.value = false
    }
  }

  /** routing */
  const pushToTeamShow = (path: string): void => {
    router.push(`/databases/${path}`)
  }

  /** search match schedule */
  const readMatchSchedule = async (): Promise<void> => {
    try {
      isLoadingMatches.value = true
      cup.matchSchedule = []
      cup.lastVisible = null
      cup.hasNext = true
      await toStoreMatchSchedule(cup)
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoadingMatches.value = false
    }
  }
  /** read next match schedule */
  const isLoadingNextMatchSchedule = ref(false)
  const readNextMatchSchedule = async (): Promise<void> => {
    try {
      isLoadingNextMatchSchedule.value = true
      await toStoreMatchSchedule(cup)
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoadingNextMatchSchedule.value = false
    }
  }

  return {
    isLoadingMatches,
    isLoadingNextMatchSchedule,
    pushToTeamShow,
    readMatchSchedule,
    readNextMatchSchedule,
    setUp
  }
}

export default useShow
