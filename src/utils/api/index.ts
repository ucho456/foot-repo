import { reactive, toRefs } from '@nuxtjs/composition-api'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

interface Options {
  headers: { 'X-Auth-Token': string }
}
interface Params {
  [key: string]: any
}
interface BaseState {
  res: {}
  err: Error | null
  isLoading: boolean
}

const baseApi = ($axios: NuxtAxiosInstance, url: string, options?: Options, params?: Params) => {
  const state = reactive<BaseState>({
    res: {},
    err: null,
    isLoading: false
  })

  const getData = async () => {
    state.isLoading = true
    try {
      const res = await $axios.$get(url, options)
      state.res = res
    } catch (err: any) {
      state.err = err
    } finally {
      state.isLoading = false
    }
  }

  const postData = async () => {
    state.isLoading = true
    try {
      const res = await $axios.$post(url, params, options)
      state.res = res
    } catch (err: any) {
      state.err = err
    } finally {
      state.isLoading = false
    }
  }

  const putData = async () => {
    state.isLoading = true
    try {
      const res = await $axios.$put(url, params, options)
      state.res = res
    } catch (err: any) {
      state.err = err
    } finally {
      state.isLoading = false
    }
  }

  const deleteData = async () => {
    state.isLoading = true
    try {
      const res = await $axios.$delete(url, params)
      state.res = res
    } catch (err: any) {
      state.err = err
    } finally {
      state.isLoading = false
    }
  }
  return { ...toRefs(state), getData, postData, putData, deleteData }
}

export default baseApi
