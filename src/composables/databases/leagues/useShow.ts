/** check */
import { ref, useRoute, useRouter } from '@nuxtjs/composition-api'
import { competitionMap, toStoreScorers, toStoreStandings } from '@/db/competitions'
import { toStoreMatchSchedule } from '@/db/matches'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'

const resetLeague = (league: {
  name: string
  competitionId: string
  standings: Standings | null
  scorers: Scorers | null
  matchSchedule: Match[]
  season: string
  yearMonth: string
}): void => {
  league.name = ''
  league.competitionId = ''
  league.standings = null
  league.scorers = null
  league.matchSchedule = []
  league.season = ''
  league.yearMonth = ''
}

const useShow = () => {
  const route = useRoute()
  const router = useRouter()
  const { openSnackbar } = useSnackbar()
  const { league } = useStore()

  /** setUp */
  const isLoadingStandings = ref(false)
  const isLoadingScorers = ref(false)
  const isLoadingMatches = ref(false)
  const setUp = async (): Promise<void> => {
    const competitionId = route.value.params.id as string
    if (league.competitionId === competitionId) return
    try {
      isLoadingStandings.value = true
      resetLeague(league)
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
      await toStoreMatchSchedule(league)
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '試合予定の取得に失敗しました。')
    } finally {
      isLoadingMatches.value = false
    }
  }

  return {
    isLoadingMatches,
    isLoadingScorers,
    isLoadingStandings,
    pushToTeamShow,
    readMatchSchedule,
    setUp
  }
}

export default useShow
