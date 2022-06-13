import { computed, ref } from '@nuxtjs/composition-api'
import useStore from '@/utils/useStore'
import { toStoreMatch } from '@/db/matches'

const useShow = () => {
  const { match } = useStore()

  const isLoadingMatch = ref(false)
  const setUp = async (matchId: string): Promise<'success' | 'failure'> => {
    try {
      isLoadingMatch.value = true
      await toStoreMatch(matchId, match)
      isLoadingMatch.value = false

      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoadingMatch.value = false
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

  return { isLoadingMatch, setUp, homeTab, homePlayers, awayTab, awayPlayers }
}

export default useShow
