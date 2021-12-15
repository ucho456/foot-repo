import { toRefs, reactive, useContext } from '@nuxtjs/composition-api'
import baseApi from '@/utils/api/index'

interface BaseState {
  res: any
  err: Error | null
  isLoading: boolean
}

const getMatches = () => {
  const { $axios, $config } = useContext()
  const options = { headers: { 'X-Auth-Token': $config.footballToken } }
  const state = reactive<BaseState>({
    res: [],
    err: null,
    isLoading: false
  })
  const getTrigger = async (url: string): Promise<void> => {
    const apiUrl = $config.footballUrl + url
    const { res, err, isLoading, getData } = baseApi($axios, apiUrl, options)
    state.isLoading = isLoading as any
    await getData()
    state.res = res as any
    state.err = err as any
  }
  return { ...toRefs(state), getTrigger }
}

export default getMatches
