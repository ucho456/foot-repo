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
import useCurrentUser from '@/utils/useCurrentUser'
import useSnackbar from '@/utils/useSnackbar'
import TextFieldEmail from '@/components/molecules/TextFieldEmail.vue'
import TextFieldPassword from '@/components/molecules/TextFieldPassword.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import ButtonTwitter from '@/components/molecules/ButtonTwitter.vue'
import ButtonGoogle from '@/components/molecules/ButtonGoogle.vue'
import ButtonBack from '@/components/molecules/ButtonBack.vue'

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
    const router = useRouter()
    const { user, isLoading, loginEmail, loginTwitter, loginGoogle } = useLogin()
    const { setUpCurrentUser } = useCurrentUser()
    const { openSnackbar } = useSnackbar()

    const submitEmail = async (): Promise<void> => {
      const result = await loginEmail()
      const message =
        result === 'success'
          ? 'ログインしました。'
          : 'ログインに失敗しました。メールアドレス、又はパスワードをお確かめ下さい。'
      openSnackbar(result, message)
      if (result === 'success') {
        await setUpCurrentUser()
        router.push('/')
      }
    }

    const submitTwitter = async (): Promise<void> => {
      const result = await loginTwitter()
      next(result)
    }

    const submitGoogle = async (): Promise<void> => {
      const result = await loginGoogle()
      next(result)
    }

    const next = async (result: 'success' | 'failure'): Promise<void> => {
      const message = result === 'success' ? 'ログインしました。' : 'エラーが発生しました。'
      openSnackbar(result, message)
      if (result === 'success') {
        await setUpCurrentUser()
        router.push('/')
      }
    }

    const back = (): void => {
      router.back()
    }

    return {
      user,
      isLoading,
      submitEmail,
      submitTwitter,
      submitGoogle,
      back
    }
  }
})
</script>
