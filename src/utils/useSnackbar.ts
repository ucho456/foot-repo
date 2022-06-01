import { inject, InjectionKey } from '@nuxtjs/composition-api'

export const SnackbarKey: InjectionKey<Snackbar> = Symbol('snackbar')

const useSnackbar = () => {
  const snackbar = inject(SnackbarKey)
  if (snackbar === undefined) throw new Error('snackbar is no provided')

  const openSnackbar = (result: string, message: string): void => {
    const color = result === 'success' ? 'success' : result === 'alert' ? 'alert' : 'failure'
    snackbar.color = color
    snackbar.message = message
    snackbar.show = true
    snackbar.textColor = result === 'alert' ? 'black' : 'white'
    const seconds = result === 'success' ? 2 : 5
    const id = setTimeout(() => {
      snackbar.color = ''
      snackbar.message = ''
      snackbar.show = false
      snackbar.textColor = ''
      clearTimeout(id)
    }, seconds * 1000)
  }

  return { snackbar, openSnackbar }
}

export default useSnackbar
