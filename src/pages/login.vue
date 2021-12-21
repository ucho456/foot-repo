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
            <v-col cols="8">
              <ButtonBlockBlue
                :disabled="invalid"
                :icon="'mdi-login'"
                :loading="isLoading"
                :text="'Login'"
                @click="login"
              />
            </v-col>
            <v-col cols="8">
              <ButtonBlockWhite :icon="'mdi-arrow-left'" :text="'Back'" @click="back" />
            </v-col>
          </v-row>
        </v-row>
      </v-container>
    </ValidationObserver>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, useRouter } from '@nuxtjs/composition-api'
import TextFieldEmail from '@/components/molecules/TextFieldEmail.vue'
import TextFieldPassword from '@/components/molecules/TextFieldPassword.vue'
import ButtonBlockBlue from '@/components/molecules/ButtonBlockBlue.vue'
import ButtonBlockWhite from '@/components/molecules/ButtonBlockWhite.vue'

export default defineComponent({
  name: 'Login',

  components: {
    TextFieldEmail,
    TextFieldPassword,
    ButtonBlockBlue,
    ButtonBlockWhite
  },

  layout: 'white',

  setup() {
    const data = reactive({ email: '', password: '' })
    const isLoading = ref(false)
    const router = useRouter()
    const login = () => router.push('/')
    const back = () => router.back()
    return { data, isLoading, login, back }
  }
})
</script>
