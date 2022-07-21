/** check */
import { inject, InjectionKey } from '@nuxtjs/composition-api'

export const SnackbarKey: InjectionKey<Snackbar> = Symbol('snackbar')

const useSnackbar = () => {
  const snackbar = inject(SnackbarKey)
  if (snackbar === undefined) throw new Error('snackbar is no provided')

  const openSnackbar = (result: 'success' | 'failure' | 'alert', message: string): void => {
    snackbar.color = result === 'success' ? '#4caf50' : result === 'failure' ? '#e91e63' : '#ffeb3b'
    snackbar.message = message
    snackbar.show = true
    snackbar.textColor = result === 'alert' ? 'black' : 'white'
    const id = setTimeout(() => {
      snackbar.color = ''
      snackbar.message = ''
      snackbar.show = false
      snackbar.textColor = ''
      clearTimeout(id)
    }, 5 * 1000)
  }

  const closeSnackbar = (): void => {
    snackbar.color = ''
    snackbar.message = ''
    snackbar.show = false
    snackbar.textColor = ''
  }

  return { closeSnackbar, openSnackbar, snackbar }
}

export default useSnackbar
