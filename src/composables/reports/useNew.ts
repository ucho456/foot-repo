import { ref, Ref } from '@nuxtjs/composition-api'
import { getMatch } from '@/db/matchesCollection'
import { getForReport } from '@/db/forReportCollection'

const useNew = () => {
  const match: Ref<Match | null> = ref(null)
  const forReport: Ref<ForReport | null> = ref(null)
  const isLoadingSetUp = ref(false)

  const setUp = async (matchId: string): Promise<'success' | 'failure'> => {
    try {
      isLoadingSetUp.value = true
      match.value = await getMatch(matchId)
      forReport.value = await getForReport(matchId)
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoadingSetUp.value = false
    }
  }

  return { match, forReport, isLoadingSetUp, setUp }
}

export default useNew
