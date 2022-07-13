<template>
  <v-container>
    <v-card class="mx-auto" max-width="400" outlined>
      <ContainerLoading :is-loading="isLoading" />
      <v-container v-if="!isLoading">
        <v-row class="mb-4 mt-3" justify="center"><v-img max-width="240" :src="logo" /></v-row>
        <ValidationObserver v-slot="{ invalid }">
          <v-row justify="center">
            <v-col cols="10"> 新しいパスワードを入力して下さい。 </v-col>
            <v-col cols="10">
              <TextFieldPassword v-model="password" />
            </v-col>
            <v-col cols="10">
              <ButtonSubmit
                :disabled="invalid"
                :is-loading="isLoadingPassword"
                :text="'送信'"
                @click="resetPassword"
              />
            </v-col>
          </v-row>
        </ValidationObserver>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
/** check */
import { defineComponent, useRoute, useRouter, ref } from '@nuxtjs/composition-api'
import { confirmPasswordReset, getAuth, verifyPasswordResetCode } from 'firebase/auth'
import { getFunctions, httpsCallable } from 'firebase/functions'
import useSnackbar from '@/utils/useSnackbar'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import TextFieldPassword from '@/components/molecules/TextFieldPassword.vue'

export default defineComponent({
  name: 'EmailAction',

  components: {
    ButtonSubmit,
    ContainerLoading,
    TextFieldPassword
  },

  layout: 'grey',

  setup() {
    const route = useRoute()
    const router = useRouter()
    const functions = getFunctions(undefined, 'asia-northeast1')
    const { openSnackbar } = useSnackbar()
    const logo = require('@/assets/signup_logo.png')

    const isLoading = ref(false)
    const doEmailAction = async () => {
      isLoading.value = true
      const mode = route.value.query.mode
      if (mode === 'verifyEmail') {
        try {
          const updateEmailVerified = httpsCallable(functions, 'updateEmailVerified')
          await updateEmailVerified()
          await getAuth().currentUser?.reload()
          openSnackbar('success', 'メール認証が完了しました。')
          router.push('/users/new')
        } catch {
          openSnackbar('failure', 'メール認証に失敗しました。')
          router.push('/')
        }
      } else if (mode === 'resetPassword') {
        isLoading.value = false
      }
    }

    doEmailAction()

    const password = ref('')
    const isLoadingPassword = ref(false)
    const resetPassword = async () => {
      try {
        isLoadingPassword.value = true
        const auth = getAuth()
        const actionCode = route.value.query.oobCode as string
        await verifyPasswordResetCode(auth, actionCode)
        await confirmPasswordReset(auth, actionCode, password.value)
        openSnackbar('success', 'パスワードを再設定しました。')
      } catch (error) {
        console.log(error)
        openSnackbar('failure', 'パスワードの再設定に失敗しました。')
      } finally {
        isLoadingPassword.value = false
        router.push('/login')
      }
    }

    return { isLoading, isLoadingPassword, logo, password, resetPassword }
  },

  head() {
    return {
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }
})
</script>
