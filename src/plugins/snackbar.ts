import { defineNuxtPlugin, onGlobalSetup, provide, reactive } from '@nuxtjs/composition-api'
import { SnackbarKey } from '@/utils/useSnackbar'

export default defineNuxtPlugin((_, inject) => {
  const snackbar: Snackbar = reactive({
    color: '',
    message: '',
    show: false,
    textColor: ''
  })

  inject('snackbar', snackbar)

  onGlobalSetup(() => {
    provide(SnackbarKey, snackbar)
  })
})
