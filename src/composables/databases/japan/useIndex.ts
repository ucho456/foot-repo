import { ref, watch } from '@nuxtjs/composition-api'
import { toStoreJapanMatchSchedule } from '@/db/matches'
import useSnackbar from '@/utils/useSnackbar'
import useStore from '@/utils/useStore'

const useIndex = () => {
  const { openSnackbar } = useSnackbar()
  const { japan } = useStore()

  /** setUp */
  const isLoading = ref(false)
  const setUp = async (): Promise<void> => {
    try {
      isLoading.value = true
      if (japan.matchSchedule.length === 0) await toStoreJapanMatchSchedule(japan)
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoading.value = false
    }
  }

  watch(
    () => japan.season,
    async () => {
      try {
        isLoading.value = true
        japan.matchSchedule = []
        await toStoreJapanMatchSchedule(japan)
      } catch (error) {
        console.log(error)
        openSnackbar('failure', '通信エラーが発生しました。')
      } finally {
        isLoading.value = false
      }
    }
  )

  return { isLoading, setUp }
}

export default useIndex
