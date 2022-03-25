import { inject, InjectionKey, reactive } from '@nuxtjs/composition-api'

type Snackbar = {
  color: '' | 'success' | 'failure'
  message: string
  show: boolean
}

export const SnackbarKey: InjectionKey<Snackbar> = Symbol('snackbar')

const useSnackbar = () => {
  const snackbar = inject(SnackbarKey)
  if (snackbar === undefined) throw new Error('snackbar is no provided')

  const openSnackbar = (result: string, message: string): void => {
    const color = result === 'success' ? 'success' : 'failure'
    snackbar.color = color
    snackbar.message = message
    snackbar.show = true
    setTimeout(() => {
      snackbar.color = ''
      snackbar.message = ''
      snackbar.show = false
    }, 2 * 1000)
  }

  return { snackbar, openSnackbar }
}

export default useSnackbar
