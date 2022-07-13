/** check */
import { ref, useRoute, useRouter } from '@nuxtjs/composition-api'
import { competitionMap, toStoreScorers, toStoreStandings } from '@/db/competitions'
import { toStoreMatchSchedule } from '@/db/matches'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'

const useShow = () => {
  const route = useRoute()
  const router = useRouter()
  const { openSnackbar } = useSnackbar()
  const { league, resetLeague } = useStore()

  /** setUp */
  const isLoadingStandings = ref(false)
  const isLoadingScorers = ref(false)
  const isLoadingMatches = ref(false)
  const setUp = async (): Promise<void> => {
    const competitionId = route.value.params.id as string
    if (league.competitionId === competitionId) return
    try {
      isLoadingStandings.value = true
      resetLeague()
      league.name = competitionMap.get(competitionId)?.name!
      league.competitionId = competitionId
      const today = new Date()
      league.season =
        competitionId === 'J-League' || today.getMonth() >= 7
          ? String(today.getFullYear())
          : String(today.getFullYear() - 1)
      await toStoreStandings(league)
      isLoadingStandings.value = false
      isLoadingScorers.value = true
      await toStoreScorers(league)
      isLoadingScorers.value = false
      isLoadingMatches.value = true
      const thisMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`
      league.yearMonth = thisMonth
      await toStoreMatchSchedule(league)
      isLoadingMatches.value = false
    } catch (error) {
      console.log(error)
      openSnackbar('failure', 'データの取得に失敗しました。')
    } finally {
      isLoadingStandings.value = false
      isLoadingScorers.value = false
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
      league.matchSchedule = []
      league.lastVisible = null
      league.hasNext = true
      await toStoreMatchSchedule(league)
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '試合予定の取得に失敗しました。')
    } finally {
      isLoadingMatches.value = false
    }
  }
  /** read next match schedule */
  const isLoadingNextMatchSchedule = ref(false)
  const readNextMatchSchedule = async (): Promise<void> => {
    try {
      isLoadingNextMatchSchedule.value = true
      await toStoreMatchSchedule(league)
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '試合予定の取得に失敗しました。')
    } finally {
      isLoadingNextMatchSchedule.value = false
    }
  }

  return {
    isLoadingMatches,
    isLoadingNextMatchSchedule,
    isLoadingScorers,
    isLoadingStandings,
    pushToTeamShow,
    readMatchSchedule,
    readNextMatchSchedule,
    setUp
  }
}

export default useShow
