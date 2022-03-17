import { reactive } from '@nuxtjs/composition-api'

const useSnackbar = () => {
  const snackbar = reactive({
    color: '',
    message: '',
    show: false
  })

  const openSnackbar = (result: string, message: string): void => {
    const color = result === 'success' ? 'success' : 'failure'
    snackbar.color = color
    snackbar.message = message
    snackbar.show = true
    setTimeout(() => {
      snackbar.show = false
    }, 2 * 1000)
  }

  return { snackbar, openSnackbar }
}

export default useSnackbar
