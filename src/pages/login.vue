<template>
  <v-card class="mx-auto" max-width="400" outlined>
    <v-card-title>
      <v-row justify="center">Foot-Repo(ロゴ予定)</v-row>
    </v-card-title>
    <v-container>
      <ValidationObserver v-slot="{ invalid }">
        <v-row justify="center">
          <v-col cols="10" class="mb-n4 mt-4">
            <TextFieldEmail v-model="user.email" />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <TextFieldPassword v-model="user.password" />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <ButtonSubmit
              :disabled="invalid"
              :icon="'mdi-send'"
              :loading="isLoading"
              :text="'ログイン'"
              @click="submitEmail"
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <ButtonTwitter
              :loading="isLoading"
              :text="'Twitterアカウントでログイン'"
              @click="submitTwitter"
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <ButtonGoogle
              :loading="isLoading"
              :text="'Googleアカウントでログイン'"
              @click="submitGoogle"
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <ButtonBack @click="back" />
          </v-col>
        </v-row>
      </ValidationObserver>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import useLogin from '@/composables/useLogin'
import TextFieldEmail from '@/components/molecules/TextFieldEmail.vue'
import TextFieldPassword from '@/components/molecules/TextFieldPassword.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import ButtonTwitter from '@/components/molecules/ButtonTwitter.vue'
import ButtonGoogle from '@/components/molecules/ButtonGoogle.vue'
import ButtonBack from '@/components/molecules/ButtonBack.vue'
import useSnackbar from '@/utils/useSnackbar'

export default defineComponent({
  name: 'Login',

  components: {
    TextFieldEmail,
    TextFieldPassword,
    ButtonSubmit,
    ButtonTwitter,
    ButtonGoogle,
    ButtonBack
  },

  layout: 'grey',

  setup() {
    const { user, isLoading, loginEmail, loginTwitter, loginGoogle } = useLogin()
    const { openSnackbar } = useSnackbar()

    const submitEmail = async () => {
      const result = await loginEmail()
      const message = result === 'success' ? 'ログインしました。' : 'ログインに失敗しました。'
      openSnackbar(result, message)
      if (result === 'success') router.push('/')
    }

    const router = useRouter()
    const back = (): void => router.back()

    const next = (result: 'success' | 'already exist' | 'failure'): void => {
      if (result === 'success' || result === 'already exist') {
        const message =
          result === 'success'
            ? 'ログインしました。'
            : '認証が完了しました。プロフィール登録を完了させて下さい。'
        openSnackbar('success', message)
        result === 'success' ? router.push('/') : router.push({ name: 'users-new' })
      } else {
        const message = 'エラーが発生しました'
        openSnackbar(result, message)
      }
    }

    const submitTwitter = async () => {
      const result = await loginTwitter()
      next(result)
    }

    const submitGoogle = async () => {
      const result = await loginGoogle()
      next(result)
    }

    return {
      user,
      isLoading,
      submitEmail,
      back,
      submitTwitter,
      submitGoogle
    }
  }
})
</script>
