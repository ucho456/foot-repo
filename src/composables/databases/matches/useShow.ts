/** check */
import { computed, ref, useRoute, useRouter } from '@nuxtjs/composition-api'
import { toStoreMatch } from '@/db/matches'
import { toStoreSameMatchReports } from '@/db/reports'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'

const useShow = () => {
  const route = useRoute()
  const router = useRouter()
  const { match, resetMatch } = useStore()
  const { openSnackbar } = useSnackbar()

  /** setUp */
  const isLoadingMatch = ref(false)
  const isLoadingSameMatchReports = ref(false)
  const setUp = async (): Promise<void> => {
    const matchId = route.value.params.id as string
    if (match.data && match.data.id === matchId) return
    try {
      isLoadingMatch.value = true
      resetMatch()
      await toStoreMatch(matchId, match)
      isLoadingMatch.value = false
      isLoadingSameMatchReports.value = true
      if (match.data && match.data.status === 'FINISHED') {
        await toStoreSameMatchReports(matchId, match)
      }
      isLoadingSameMatchReports.value = false
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '試合データの取得に失敗しました。')
    } finally {
      isLoadingMatch.value = false
      isLoadingSameMatchReports.value = false
    }
  }

  /** member tab */
  const homeTab = ref(0)
  const homePlayers = computed(() => {
    if (!match.detail) return []
    return homeTab.value === 0 ? match.detail.homeLineup : match.detail.homeBench
  })
  const awayTab = ref(0)
  const awayPlayers = computed(() => {
    if (!match.detail) return []
    return awayTab.value === 0 ? match.detail.awayLineup : match.detail.awayBench
  })

  /** routing */
  const pushToReportNew = (): void => {
    const matchId = route.value.params.id as string
    router.push(`/reports/new?matchId=${matchId}`)
  }

  return {
    awayPlayers,
    awayTab,
    homePlayers,
    homeTab,
    isLoadingMatch,
    isLoadingSameMatchReports,
    pushToReportNew,
    setUp
  }
}

export default useShow
