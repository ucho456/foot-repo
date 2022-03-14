import { ref, reactive, useRouter } from '@nuxtjs/composition-api'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  TwitterAuthProvider
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import db from '@/plugins/firebase'

export const useSignup = () => {
  const inputData = reactive({ email: '', password: '' })
  const isLoading = ref(false)
  const dialog = reactive({ message: '', title: '', show: false })

  const signupEmail = async (): Promise<void> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        inputData.email,
        inputData.password
      )
      await sendEmailVerification(userCredential.user)
      dialog.message =
        '認証メールを送信しました。\nメールに記載してあるURLをクリックし、認証を完了させて下さい。'
      dialog.title = '成功'
    } catch (error) {
      dialog.message =
        error instanceof Error && error.message.includes('auth/email-already-in-use')
          ? '既に使用されているメールアドレスです。'
          : 'エラーが発生しました。'
      dialog.title = '失敗'
    } finally {
      dialog.show = true
      isLoading.value = false
    }
  }

  const router = useRouter()
  const routerBack = (): void => router.back()

  const createInitCurrentUser = async (
    provider: TwitterAuthProvider | GoogleAuthProvider
  ): Promise<void> => {
    try {
      isLoading.value = true
      const auth = getAuth()
      const userCredential = await signInWithPopup(auth, provider)
      const uid = userCredential.user.uid
      const publicProfileRef = await doc(db, 'public-profiles', uid)
      const publicProfileSnap = await getDoc(publicProfileRef)
      if (publicProfileSnap.exists()) {
        routerBack()
      } else {
        router.push({
          name: 'public-profile-new',
          params: {
            uid: userCredential.user.uid,
            name: userCredential.user.displayName || '',
            photoUrl: userCredential.user.photoURL || ''
          }
        })
      }
    } catch {
      dialog.message = 'エラーが発生しました。'
      dialog.title = '失敗'
      dialog.show = true
    } finally {
      isLoading.value = false
    }
  }

  const signupTwitter = async (): Promise<void> => {
    const provider = new TwitterAuthProvider()
    await createInitCurrentUser(provider)
  }

  const signupGoogle = async (): Promise<void> => {
    const provider = new GoogleAuthProvider()
    await createInitCurrentUser(provider)
  }

  const closeDialog = (): void => {
    dialog.message = ''
    dialog.title = ''
    dialog.show = false
  }

  return {
    inputData,
    isLoading,
    dialog,
    routerBack,
    signupEmail,
    signupTwitter,
    signupGoogle,
    closeDialog
  }
}
