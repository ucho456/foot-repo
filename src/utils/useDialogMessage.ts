import { reactive } from '@nuxtjs/composition-api'

const useDialogMessage = () => {
  const dialogMessage = reactive({ message: '', show: false })
  const openDialogMessage = (message: string): void => {
    dialogMessage.message = message
    dialogMessage.show = true
  }
  const closeDialogMessage = (): void => {
    dialogMessage.message = ''
    dialogMessage.show = false
  }

  return { dialogMessage, openDialogMessage, closeDialogMessage }
}

export default useDialogMessage
