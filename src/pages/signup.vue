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
              :text="'登録する'"
              @click="submitEmail"
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <ButtonTwitter
              :loading="isLoading"
              :text="'Twitterアカウントで登録'"
              @click="submitTwitter"
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <ButtonGoogle
              :loading="isLoading"
              :text="'Googleアカウントで登録'"
              @click="submitGoogle"
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <ButtonBack :disabled="isLoading" @click="back" />
          </v-col>
        </v-row>
        <v-row justify="center">
          <NuxtLink class="text-caption hover mb-4" to="/login">
            アカウントをお持ちの場合はログインから
          </NuxtLink>
        </v-row>
      </ValidationObserver>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import useSignup from '@/composables/useSignup'
import useSnackbar from '@/utils/useSnackbar'
import TextFieldEmail from '@/components/molecules/TextFieldEmail.vue'
import TextFieldPassword from '@/components/molecules/TextFieldPassword.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import ButtonTwitter from '@/components/molecules/ButtonTwitter.vue'
import ButtonGoogle from '@/components/molecules/ButtonGoogle.vue'
import ButtonBack from '@/components/molecules/ButtonBack.vue'

export default defineComponent({
  name: 'Signup',

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
    const { user, isLoading, signupEmail, signupTwitter, signupGoogle } = useSignup()
    const { openSnackbar } = useSnackbar()

    const submitEmail = async () => {
      const result = await signupEmail()
      const message =
        result === 'success'
          ? '認証メールを送信しました。'
          : result === 'already used'
          ? '既に使用されているメールアドレスです。'
          : 'エラーが発生しました。'
      openSnackbar(result, message)
    }

    const next = (result: 'success' | 'already exist' | 'failure'): void => {
      if (result === 'success' || result === 'already exist') {
        const message = result === 'success' ? '認証が完了しました。' : 'ログインしました。'
        openSnackbar('success', message)
        result === 'success' ? router.push({ name: 'users-new' }) : router.push('/')
      } else {
        const message = 'エラーが発生しました'
        openSnackbar(result, message)
      }
    }

    const submitTwitter = async () => {
      const result = await signupTwitter()
      next(result)
    }

    const submitGoogle = async () => {
      const result = await signupGoogle()
      next(result)
    }

    const back = (): void => router.back()

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

<style lang="scss" scoped>
.hover {
  &:hover {
    opacity: 0.8;
  }
}
</style>
