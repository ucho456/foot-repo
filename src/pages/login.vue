<template>
  <v-card class="mx-auto" max-width="400" outlined>
    <v-card-title>
      <v-row justify="center">Foot-Repo(ロゴ予定)</v-row>
    </v-card-title>
    <ValidationObserver v-slot="{ invalid }">
      <v-container>
        <v-row justify="center">
          <v-col cols="10" class="mb-n4 mt-4">
            <TextFieldEmail v-model="data.email" />
          </v-col>
          <v-col cols="10">
            <TextFieldPassword v-model="data.password" />
          </v-col>
          <v-row class="mb-8" justify="center">
            <v-col cols="10">
              <ButtonBlockBlue
                :disabled="invalid"
                :icon="'mdi-login'"
                :loading="isLoading"
                :text="'ログイン'"
                @click="loginEmail"
              />
            </v-col>
            <v-col cols="10">
              <ButtonTwitter @click="loginTwitter" />
            </v-col>
            <v-col cols="10">
              <ButtonGoogle @click="loginGoogle" />
            </v-col>
            <v-col cols="10">
              <ButtonBlockWhite :icon="'mdi-arrow-left'" :text="'戻る'" @click="back" />
            </v-col>
          </v-row>
        </v-row>
      </v-container>
    </ValidationObserver>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, useRouter } from '@nuxtjs/composition-api'
import { signInEmail, signInTwitter, signInGoogle } from '@/composables/useLogin'
import TextFieldEmail from '@/components/molecules/TextFieldEmail.vue'
import TextFieldPassword from '@/components/molecules/TextFieldPassword.vue'
import ButtonBlockBlue from '@/components/molecules/ButtonBlockBlue.vue'
import ButtonTwitter from '@/components/molecules/ButtonTwitter.vue'
import ButtonGoogle from '@/components/molecules/ButtonGoogle.vue'
import ButtonBlockWhite from '@/components/molecules/ButtonBlockWhite.vue'

export default defineComponent({
  name: 'Login',

  components: {
    TextFieldEmail,
    TextFieldPassword,
    ButtonBlockBlue,
    ButtonTwitter,
    ButtonGoogle,
    ButtonBlockWhite
  },

  layout: 'white',

  setup() {
    const data = reactive({ email: '', password: '' })
    const isLoading = ref(false)
    const router = useRouter()
    const back = () => router.back()
    const loginEmail = async () => {
      isLoading.value = true
      const user = await signInEmail(isLoading, data.email, data.password)
      console.log(user)
      router.push('/')
      isLoading.value = false
    }

    const loginTwitter = async () => {
      const user = await signInTwitter(isLoading)
      console.log(user)
      router.push('/')
    }

    const loginGoogle = async () => {
      const user = await signInGoogle(isLoading)
      console.log(user)
      router.push('/')
    }

    return { data, isLoading, back, loginEmail, loginTwitter, loginGoogle }
  }
})
</script>
