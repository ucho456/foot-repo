import { reactive, ref } from '@nuxtjs/composition-api'
import { fetchUser } from '@/db/users'
import useLoginUser from '@/utils/useLoginUser'

const useEdit = () => {
  const { loginUser } = useLoginUser()

  const inputUser: InputUser = reactive({
    id: '',
    name: '',
    imageUrl: null,
    greet: '',
    competitionId: '',
    team: { id: '', name: '' }
  })
  const userImageFile = ref<File | null>(null)

  const isLoadingSetUp = ref(false)
  const setUp = async (): Promise<'success' | 'failure' | 'unauthorized access'> => {
    try {
      isLoadingSetUp.value = true
      if (loginUser.value) {
        const user = await fetchUser(loginUser.value.uid)
        if (user) {
          inputUser.id = user.id
          inputUser.name = user.name
          inputUser.imageUrl = user.imageUrl
          inputUser.greet = user.greet
          inputUser.competitionId = user.competitionId
          inputUser.team = user.team
        } else {
          throw new Error('unauthorized access')
        }
      } else {
        throw new Error('unauthorized access')
      }
      return 'success'
    } catch (error) {
      console.log(error)
      return error instanceof Error && error.message.includes('unauthorized access')
        ? 'unauthorized access'
        : 'failure'
    } finally {
      isLoadingSetUp.value = false
    }
  }

  const changeImageUrl = (imageFile: File): void => {
    inputUser.imageUrl = URL.createObjectURL(imageFile)
    userImageFile.value = imageFile
  }

  const clearImageUrl = (): void => {
    inputUser.imageUrl = null
    userImageFile.value = null
  }

  const isLoadingSubmit = ref(false)
  const update = async (): Promise<'success' | 'failure'> => {
    try {
      isLoadingSubmit.value = true
      return 'success'
    } catch (error) {
      console.log(error)
      return 'failure'
    } finally {
      isLoadingSubmit.value = false
    }
  }

  return {
    inputUser,
    isLoadingSetUp,
    setUp,
    changeImageUrl,
    clearImageUrl,
    isLoadingSubmit,
    update
  }
}

export default useEdit
