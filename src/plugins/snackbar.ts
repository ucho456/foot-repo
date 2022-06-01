import {
  defineNuxtPlugin,
  onGlobalSetup,
  onUnmounted,
  reactive,
  provide
} from '@nuxtjs/composition-api'
import { SnackbarKey } from '@/utils/useSnackbar'

export default defineNuxtPlugin((_, inject) => {
  const snackbar: Snackbar = reactive({
    color: '',
    message: '',
    show: false,
    textColor: ''
  })

  inject('snackbar', snackbar)

  const unsubscribe = () => {
    snackbar.color = ''
    snackbar.message = ''
    snackbar.show = false
    snackbar.textColor = ''
  }

  onGlobalSetup(() => {
    provide(SnackbarKey, snackbar)
    onUnmounted(unsubscribe)
  })
})
