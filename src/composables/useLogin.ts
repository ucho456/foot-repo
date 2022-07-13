/** check */
import { reactive, ref, useRouter } from '@nuxtjs/composition-api'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  TwitterAuthProvider
} from 'firebase/auth'
import { fetchUser } from '@/db/users'
import useSnackbar from '@/utils/useSnackbar'

const useLogin = () => {
  const router = useRouter()
  const { openSnackbar } = useSnackbar()

  const user = reactive({ email: '', password: '' })
  const isLoading = ref(false)

  const loginEmail = async (): Promise<void> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password)
      if (!auth.currentUser?.emailVerified) {
        await signOut(auth)
        openSnackbar('failure', 'メールアドレスの認証が完了していません。')
      }
      const uid = userCredential.user.uid
      const resUser = await fetchUser(uid)
      if (resUser) {
        openSnackbar('success', 'ログインしました。')
        router.push('/')
      } else {
        const message = 'ログインしました。ユーザープロフィールが未登録なので完了させて下さい。'
        openSnackbar('alert', message)
        router.push('/users/new')
      }
    } catch (error) {
      console.log(error)
      error instanceof Error && error.message.includes('auth/user-not-found')
        ? openSnackbar('failure', 'メールアドレス又はパスワードが間違っています。')
        : openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoading.value = false
    }
  }

  const loginTwitter = async (): Promise<void> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const provider = new TwitterAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      const uid = userCredential.user.uid
      const resUser = await fetchUser(uid)
      if (resUser) {
        openSnackbar('success', 'ログインしました。')
        router.push('/')
      } else {
        openSnackbar('alert', 'プロフィールの作成がまだ完了していません。')
        router.push('/users/new')
      }
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoading.value = false
    }
  }

  const loginGoogle = async (): Promise<void> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      const uid = userCredential.user.uid
      const resUser = await fetchUser(uid)
      if (resUser) {
        openSnackbar('success', 'ログインしました。')
        router.push('/')
      } else {
        openSnackbar('success', 'プロフィールの作成がまだ完了していません。')
        router.push('/users/new')
      }
    } catch (error) {
      console.log(error)
      openSnackbar('failure', '通信エラーが発生しました。')
    } finally {
      isLoading.value = false
    }
  }

  const back = (): void => {
    router.back()
  }

  return { back, isLoading, loginEmail, loginGoogle, loginTwitter, user }
}

export default useLogin
