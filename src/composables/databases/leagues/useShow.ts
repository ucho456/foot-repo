import { ref, Ref } from '@nuxtjs/composition-api'
import { getScores, getStandings } from '@/db/competitions'

const useShow = () => {
  const standings: Ref<Standings | null> = ref(null)
  const scorers: Ref<Scorers | null> = ref(null)
  const season = ref('2022')

  const isLoadingStandings = ref(false)
  const isLoadingScorers = ref(false)
  const loading = (value: boolean) => {
    isLoadingStandings.value = value
    isLoadingScorers.value = value
  }
  const setUp = async (competitionId: string) => {
    try {
      loading(true)
      await getStandings(competitionId, season.value, standings)
      isLoadingStandings.value = false
      await getScores(competitionId, season.value, scorers)
      isLoadingScorers.value = false
      return 'success'
    } catch {
      return 'failure'
    } finally {
      loading(false)
    }
  }

  return { standings, scorers, season, isLoadingStandings, isLoadingScorers, setUp }
}

export default useShow
