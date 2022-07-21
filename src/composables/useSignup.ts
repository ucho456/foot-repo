/** check */
import { reactive, ref, useRouter } from '@nuxtjs/composition-api'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  TwitterAuthProvider
} from 'firebase/auth'
import { fetchUser } from '@/db/users'
import useSnackbar from '@/utils/useSnackbar'

const useSignup = () => {
  const router = useRouter()
  const { openSnackbar } = useSnackbar()

  const user = reactive({ email: '', password: '' })
  const termsCheck = ref(false)

  const isLoading = ref(false)
  const signupEmail = async (): Promise<void> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password)
      await sendEmailVerification(userCredential.user)
      openSnackbar('success', '認証メールを送信しました。')
    } catch (error) {
      console.log(error)
      error instanceof Error && error.message.includes('auth/email-already-in-use')
        ? openSnackbar('failure', '既に使用されているメールアドレスです。')
        : openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoading.value = false
    }
  }

  const signupTwitter = async (): Promise<void> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const provider = new TwitterAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      const uid = userCredential.user.uid
      const user = await fetchUser(uid)
      if (!user) {
        openSnackbar('success', '認証が完了しました。続けてユーザープロフィールを登録して下さい。')
        router.push('/users/new')
      } else {
        openSnackbar('success', 'ログインしました。')
        router.push('/')
      }
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoading.value = false
    }
  }

  const signupGoogle = async (): Promise<void> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      const uid = userCredential.user.uid
      const user = await fetchUser(uid)
      if (!user) {
        openSnackbar('success', '認証が完了しました。続けてユーザープロフィールを登録して下さい。')
        router.push({ name: 'users-new' })
      } else {
        openSnackbar('success', 'ログインしました。')
        router.push('/')
      }
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoading.value = false
    }
  }

  const isDialog = ref(false)
  const showDialog = (): void => {
    isDialog.value = true
  }
  const hideDialog = (): void => {
    isDialog.value = false
  }

  const back = (): void => {
    router.back()
  }

  return {
    back,
    hideDialog,
    isDialog,
    isLoading,
    showDialog,
    signupEmail,
    signupGoogle,
    signupTwitter,
    termsCheck,
    user
  }
}

export default useSignup
