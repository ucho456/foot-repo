<template>
  <v-container>
    <v-card class="mx-auto" max-width="400" outlined>
      <v-container>
        <v-row class="mt-3" justify="center"><v-img max-width="240" :src="logo" /></v-row>
        <ValidationObserver v-slot="{ invalid }">
          <v-row justify="center">
            <v-col cols="10" class="mb-n6 mt-4">
              <TextFieldEmail v-model="user.email" />
            </v-col>
            <v-col cols="10">
              <TextFieldPassword v-model="user.password" />
            </v-col>
            <v-col cols="10">
              <ButtonSubmit
                :disabled="invalid || isDisabled('email')"
                :is-loading="isLoading('email')"
                :text="'ログイン'"
                @click="loginEmail"
              />
            </v-col>
            <v-col cols="10">
              <ButtonTwitter
                :disabled="isDisabled('twitter')"
                :is-loading="isLoading('twitter')"
                :text="'Twitterアカウントでログイン'"
                @click="loginTwitter"
              />
            </v-col>
            <v-col cols="10">
              <ButtonGoogle
                :disabled="isDisabled('google')"
                :is-loading="isLoading('google')"
                :text="'Googleアカウントでログイン'"
                @click="loginGoogle"
              />
            </v-col>
            <v-col cols="10">
              <ButtonBack :disabled="isDisabled('back')" @click="back" />
            </v-col>
            <v-col cols="10" class="my-n6 text-center">
              <span class="o-hover o-reset-password" @click="showDialog">
                パスワードを忘れてしまった場合はこちら
              </span>
            </v-col>
            <NuxtLink class="text-caption o-hover mb-4" to="/signup"> 新規登録はこちら </NuxtLink>
          </v-row>
        </ValidationObserver>
      </v-container>
    </v-card>
    <DialogResetPassword :is-dialog="dialog" @hide="hideDialog" />
  </v-container>
</template>

<script lang="ts">
/** check */
import { defineComponent } from '@nuxtjs/composition-api'
import useLogin from '@/composables/useLogin'
import ButtonBack from '@/components/molecules/ButtonBack.vue'
import ButtonGoogle from '@/components/molecules/ButtonGoogle.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import ButtonTwitter from '@/components/molecules/ButtonTwitter.vue'
import DialogResetPassword from '@/components/organisms/DialogResetPassword.vue'
import TextFieldEmail from '@/components/molecules/TextFieldEmail.vue'
import TextFieldPassword from '@/components/molecules/TextFieldPassword.vue'

export default defineComponent({
  name: 'Login',

  components: {
    ButtonBack,
    ButtonGoogle,
    ButtonSubmit,
    ButtonTwitter,
    DialogResetPassword,
    TextFieldEmail,
    TextFieldPassword
  },

  layout: 'grey',

  setup() {
    const {
      back,
      dialog,
      hideDialog,
      isDisabled,
      isLoading,
      loginEmail,
      loginGoogle,
      loginTwitter,
      showDialog,
      user
    } = useLogin()
    const logo = require('@/assets/signup_logo.png')

    return {
      back,
      dialog,
      hideDialog,
      isDisabled,
      isLoading,
      loginEmail,
      loginGoogle,
      loginTwitter,
      logo,
      showDialog,
      user
    }
  }
})
</script>

<style lang="scss" scoped>
.o-reset-password {
  font-size: 12px;
  color: #1a237e;
  text-decoration: underline;
  line-height: 66px;
}
</style>
