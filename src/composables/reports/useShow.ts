import { ref, Ref } from '@nuxtjs/composition-api'
import { getReport } from '@/db/reports'
import { getMatchByRef } from '@/db/matches'

const useShow = () => {
  const report: Ref<Report | null> = ref(null)
  const match: Ref<Match | null> = ref(null)

  const isLoadingSetUp = ref(false)
  const setUp = async (reportId: string): Promise<'success' | 'failure'> => {
    try {
      isLoadingSetUp.value = true
      report.value = await getReport(reportId)
      match.value = await getMatchByRef(report.value?.match.ref!)
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoadingSetUp.value = false
    }
  }

  return { report, match, isLoadingSetUp, setUp }
}

export default useShow
