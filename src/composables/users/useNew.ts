import { reactive, ref } from '@nuxtjs/composition-api'
import { getAuth, getIdTokenResult } from 'firebase/auth'
import { createUser } from '@/db/users'
import { teamMap } from '@/utils/selectTeams'
import uploadAndGetImageUrl from '@/utils/uploadAndGetImageUrl'
import useLoginUser from '@/utils/useLoginUser'

const useNew = () => {
  const { setUpLoginUser } = useLoginUser()

  const inputUser: InputUser = reactive({
    id: '',
    name: '',
    imageUrl: null,
    greet: '',
    competitionId: '',
    team: { id: '', name: '' }
  })

  const isLoadingSetUp = ref(false)
  const setUp = async (): Promise<'success' | 'failure' | 'unauthorized access'> => {
    try {
      isLoadingSetUp.value = true
      const auth = getAuth()
      const currentUser = auth.currentUser!
      const idTokenResult = await getIdTokenResult(currentUser)
      const initSetting = idTokenResult.claims.initSetting as unknown as boolean
      if (!initSetting) {
        inputUser.id = currentUser.uid
        inputUser.name = currentUser.displayName ? currentUser.displayName.substring(0, 20) : ''
        inputUser.imageUrl = currentUser.photoURL
      } else {
        return 'unauthorized access'
      }
      return 'success'
    } catch (error) {
      console.log(error)
      return 'failure'
    } finally {
      isLoadingSetUp.value = false
    }
  }

  const changeImageUrl = (image: string): void => {
    inputUser.imageUrl = image
  }
  const clearImageUrl = (): void => {
    inputUser.imageUrl = null
  }
  const inputCompetitionId = (competitionId: string): void => {
    inputUser.competitionId = competitionId
    inputUser.team.id = ''
  }

  const isLoadingSubmit = ref(false)
  const create = async (): Promise<'success' | 'failure'> => {
    try {
      isLoadingSubmit.value = true
      if (inputUser.team.id) {
        inputUser.team.name = teamMap.get(inputUser.team.id)?.name!
      }
      const imageUrl = inputUser.imageUrl
        ? await uploadAndGetImageUrl(`users/${inputUser.id}`, inputUser.imageUrl)
        : null
      if (imageUrl) inputUser.imageUrl = imageUrl
      await createUser(inputUser)
      setUpLoginUser(inputUser)
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
    inputCompetitionId,
    isLoadingSubmit,
    create
  }
}

export default useNew
