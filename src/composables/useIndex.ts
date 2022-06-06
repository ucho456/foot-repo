import { ref } from '@nuxtjs/composition-api'
import { toStoreFirstReports } from '@/db/reports'
import useStore from '@/utils/useStore'

const useIndex = () => {
  const { reports } = useStore()

  const isLoadingReports = ref(false)
  const setUp = async () => {
    try {
      isLoadingReports.value = true
      await toStoreFirstReports(reports)
      isLoadingReports.value = false

      return 'success'
    } catch {
      return 'failure'
    } finally {
      isLoadingReports.value = false
    }
  }

  return { isLoadingReports, setUp }
}

export default useIndex
