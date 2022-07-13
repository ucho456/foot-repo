<template>
  <v-container>
    <v-card outlined>
      <ContainerLoading :is-loading="isLoading" />
      <v-container v-if="!isLoading">
        <v-row>
          <v-col>
            <TextFieldPassword v-model="password" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <ButtonSubmit :text="'送信'" @click="resetPassword" />
          </v-col>
        </v-row>
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
    const resetPassword = async () => {
      try {
        const auth = getAuth()
        const actionCode = route.value.query.oobCode as string
        await verifyPasswordResetCode(auth, actionCode)
        await confirmPasswordReset(auth, actionCode, password.value)
        openSnackbar('success', 'パスワードの再設定が完了しました。')
        router.push('/')
      } catch (error) {
        console.log(error)
        openSnackbar('failure', 'パスワードの再設定に失敗しました。')
      }
    }

    return { isLoading, password, resetPassword }
  },

  head() {
    return {
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }
})
</script>
