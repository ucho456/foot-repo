import { ref, Ref } from '@nuxtjs/composition-api'
import { getScores, getStandings } from '@/db/competitions'

const useShow = () => {
  const standings: Ref<Standings | null> = ref(null)
  const scorers: Ref<Scorers | null> = ref(null)
  const season = ref('')

  const isLoadingStandings = ref(false)
  const isLoadingScorers = ref(false)
  const setUp = async (competitionId: string) => {
    try {
      isLoadingStandings.value = true
      season.value =
        competitionId === 'J-League'
          ? String(new Date().getFullYear())
          : String(new Date().getFullYear() - 1)
      await getStandings(competitionId, season.value, standings)
      isLoadingStandings.value = false
      isLoadingScorers.value = true
      await getScores(competitionId, season.value, scorers)
      isLoadingScorers.value = false
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoadingStandings.value = false
      isLoadingScorers.value = false
    }
  }

  return { standings, scorers, season, isLoadingStandings, isLoadingScorers, setUp }
}

export default useShow
