import {
  defineNuxtPlugin,
  onGlobalSetup,
  onUnmounted,
  reactive,
  provide
} from '@nuxtjs/composition-api'
import { SnackbarKey } from '@/utils/useSnackbar'

type Snackbar = {
  color: '' | 'success' | 'failure'
  message: string
  show: boolean
}

export default defineNuxtPlugin(async (_, inject) => {
  const snackbar = reactive<Snackbar>({
    color: '',
    message: '',
    show: false
  })

  const unsubscribe = () => {
    snackbar.color = ''
    snackbar.message = ''
    snackbar.show = false
  }

  onGlobalSetup(() => {
    provide(SnackbarKey, snackbar)
    onUnmounted(unsubscribe)
  })
})
