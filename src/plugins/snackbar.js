import {
  defineNuxtPlugin,
  onGlobalSetup,
  onUnmounted,
  reactive,
  provide
} from '@nuxtjs/composition-api'
import { SnackbarKey } from '@/utils/useSnackbar'

export default defineNuxtPlugin((_, inject) => {
  const snackbar = reactive({
    color: '',
    message: '',
    show: false
  })

  inject('snackbar', snackbar)

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
