import { ref } from '@nuxtjs/composition-api'
import { competitionMap, toStoreScorers, toStoreStandings } from '@/db/competitions'
import { toStoreMatchSchedule } from '@/db/matches'
import useStore from '@/utils/useStore'

const useShow = () => {
  const { league } = useStore()

  const isLoadingStandings = ref(false)
  const isLoadingScorers = ref(false)
  const isLoadingMatches = ref(false)
  const resetLeague = (): void => {
    league.name = ''
    league.competitionId = ''
    league.standings = null
    league.scorers = null
    league.matchSchedule = []
    league.season = ''
    league.yearMonth = ''
  }
  const setUp = async (competitionId: string): Promise<'success' | 'failure'> => {
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

      return 'success'
    } catch (error) {
      console.log(error)
      return 'failure'
    } finally {
      isLoadingStandings.value = false
      isLoadingScorers.value = false
      isLoadingMatches.value = false
    }
  }

  const search = async (): Promise<'success' | 'failure'> => {
    try {
      isLoadingMatches.value = true
      await toStoreMatchSchedule(league)
      return 'success'
    } catch (error) {
      console.log(error)
      return 'failure'
    } finally {
      isLoadingMatches.value = false
    }
  }

  return { isLoadingStandings, isLoadingScorers, isLoadingMatches, setUp, search }
}

export default useShow
