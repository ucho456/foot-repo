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
            <v-col cols="10" sm="8" class="d-flex my-n9">
              <v-checkbox v-model="termsCheck" />
              <span class="o-hover o-terms" @click="showDialog">
                利用規約に同意してご登録下さい。
              </span>
            </v-col>
            <v-col cols="10">
              <ButtonSubmit
                :disabled="invalid || !termsCheck || isDisabled('email')"
                :is-loading="isLoading('email')"
                :text="'登録する'"
                @click="signupEmail"
              />
            </v-col>
            <v-col cols="10">
              <ButtonTwitter
                :disabled="!termsCheck || isDisabled('twitter')"
                :is-loading="isLoading('twitter')"
                :text="'Twitterアカウントで登録'"
                @click="signupTwitter"
              />
            </v-col>
            <v-col cols="10">
              <ButtonGoogle
                :disabled="!termsCheck || isDisabled('google')"
                :is-loading="isLoading('google')"
                :text="'Googleアカウントで登録'"
                @click="signupGoogle"
              />
            </v-col>
            <v-col cols="10">
              <ButtonBack :disabled="isDisabled('back')" @click="back" />
            </v-col>
            <NuxtLink class="o-hover mb-4 text-caption" to="/login">
              アカウントをお持ちの場合はこちら
            </NuxtLink>
          </v-row>
        </ValidationObserver>
      </v-container>
      <DialogTerms :is-dialog="isDialog" @hide="hideDialog" />
    </v-card>
  </v-container>
</template>

<script lang="ts">
/** check */
import { defineComponent } from '@nuxtjs/composition-api'
import useSignup from '@/composables/useSignup'
import ButtonBack from '@/components/molecules/ButtonBack.vue'
import ButtonGoogle from '@/components/molecules/ButtonGoogle.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import ButtonTwitter from '@/components/molecules/ButtonTwitter.vue'
import DialogTerms from '@/components/organisms/DialogTerms.vue'
import TextFieldEmail from '@/components/molecules/TextFieldEmail.vue'
import TextFieldPassword from '@/components/molecules/TextFieldPassword.vue'

export default defineComponent({
  name: 'Signup',

  components: {
    ButtonBack,
    ButtonGoogle,
    ButtonSubmit,
    ButtonTwitter,
    DialogTerms,
    TextFieldEmail,
    TextFieldPassword
  },

  layout: 'grey',

  setup() {
    const {
      back,
      hideDialog,
      isDialog,
      isDisabled,
      isLoading,
      showDialog,
      signupEmail,
      signupGoogle,
      signupTwitter,
      termsCheck,
      user
    } = useSignup()
    const logo = require('@/assets/signup_logo.png')

    return {
      back,
      hideDialog,
      isDialog,
      isDisabled,
      isLoading,
      logo,
      showDialog,
      signupEmail,
      signupGoogle,
      signupTwitter,
      termsCheck,
      user
    }
  }
})
</script>

<style lang="scss" scoped>
.o-terms {
  font-size: 12px;
  color: #1a237e;
  text-decoration: underline;
  line-height: 66px;
}
</style>
