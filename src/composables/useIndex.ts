import { ref } from '@nuxtjs/composition-api'
import { getFirstReports } from '@/db/reports'
import useStore from '@/utils/useStore'

const useIndex = () => {
  const { reports } = useStore()

  const isLoadingSetUp = ref(false)
  const setUp = async () => {
    try {
      isLoadingSetUp.value = true
      await getFirstReports(reports)
      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoadingSetUp.value = false
    }
  }

  return { setUp }
}

export default useIndex
