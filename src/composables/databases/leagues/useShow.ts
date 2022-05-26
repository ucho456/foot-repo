import { ref } from '@nuxtjs/composition-api'
import { getScores, getStandings } from '@/db/competitions'
import { getMonthMatches } from '@/db/matches'
import useStore from '@/utils/useStore'

const useShow = () => {
  const { databases } = useStore()

  const isLoadingStandings = ref(false)
  const isLoadingScorers = ref(false)
  const isLoadingMatches = ref(false)
  const setUp = async (competitionId: string) => {
    try {
      isLoadingStandings.value = true
      databases.competitionId = competitionId
      databases.season =
        competitionId === 'J-League'
          ? String(new Date().getFullYear())
          : String(new Date().getFullYear() - 1)
      await getStandings(databases)
      isLoadingStandings.value = false

      isLoadingScorers.value = true
      await getScores(databases)
      isLoadingScorers.value = false

      isLoadingMatches.value = true
      const today = new Date()
      const thisMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`
      databases.yearMonth = thisMonth
      await getMonthMatches(databases)
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

  return { isLoadingStandings, isLoadingScorers, isLoadingMatches, setUp }
}

export default useShow
