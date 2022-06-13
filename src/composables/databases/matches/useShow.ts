import { computed, ref } from '@nuxtjs/composition-api'
import useStore from '@/utils/useStore'
import { toStoreMatch } from '@/db/matches'
import { toStoreSameMatchReports } from '@/db/reports'

const useShow = () => {
  const { match } = useStore()

  const isLoadingMatch = ref(false)
  const isLoadingSameMatchReports = ref(false)
  const setUp = async (matchId: string): Promise<'success' | 'failure'> => {
    try {
      isLoadingMatch.value = true
      await toStoreMatch(matchId, match)
      isLoadingMatch.value = false

      isLoadingSameMatchReports.value = true
      await toStoreSameMatchReports(matchId, match)
      isLoadingSameMatchReports.value = false

      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoadingMatch.value = false
      isLoadingSameMatchReports.value = false
    }
  }

  const homeTab = ref(0)
  const homePlayers = computed(() => {
    if (!match.detail) {
      return []
    }
    return homeTab.value === 0 ? match.detail.homeLineup : match.detail.homeBench
  })
  const awayTab = ref(0)
  const awayPlayers = computed(() => {
    if (!match.detail) {
      return []
    }
    return awayTab.value === 0 ? match.detail.awayLineup : match.detail.awayBench
  })

  return {
    isLoadingMatch,
    isLoadingSameMatchReports,
    setUp,
    homeTab,
    homePlayers,
    awayTab,
    awayPlayers
  }
}

export default useShow
