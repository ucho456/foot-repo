import { ref } from '@nuxtjs/composition-api'
import { toStoreFirstReports } from '@/db/reports'

const useIndex = () => {
  const isLoadingReports = ref(false)
  const setUp = async () => {
    try {
      isLoadingReports.value = true
      await toStoreFirstReports()
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
