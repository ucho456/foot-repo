import { ref } from '@nuxtjs/composition-api'
import { competitionMap, setScores, setStandings } from '@/db/competitions'
import { setMatchSchedule } from '@/db/matches'
import useStore from '@/utils/useStore'

const useShow = () => {
  const { league } = useStore()

  const isLoadingStandings = ref(false)
  const isLoadingScorers = ref(false)
  const isLoadingMatches = ref(false)
  const setUp = async (competitionId: string): Promise<'success' | 'failure'> => {
    try {
      isLoadingStandings.value = true
      league.name = competitionMap.get(competitionId)?.name!
      league.competitionId = competitionId
      league.season =
        competitionId === 'J-League'
          ? String(new Date().getFullYear())
          : String(new Date().getFullYear() - 1)
      await setStandings(league)
      isLoadingStandings.value = false

      isLoadingScorers.value = true
      await setScores(league)
      isLoadingScorers.value = false

      isLoadingMatches.value = true
      const today = new Date()
      const thisMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`
      league.yearMonth = thisMonth
      await setMatchSchedule(league)
      isLoadingMatches.value = false

      return 'success'
    } catch {
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
      await setMatchSchedule(league)
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoadingMatches.value = false
    }
  }

  return { isLoadingStandings, isLoadingScorers, isLoadingMatches, setUp, search }
}

export default useShow
