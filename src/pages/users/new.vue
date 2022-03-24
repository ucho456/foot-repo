<template>
  <v-card outlined>
    <v-container>
      <ValidationObserver v-slot="{ invalid }">
        <v-row justify="center">
          <v-col cols="10">
            <TextField
              v-model="user.name"
              :label="'ニックネーム'"
              :max-length="20"
              :rules="'required'"
            />
          </v-col>
          <v-col cols="10">
            <ButtonSubmit
              :disabled="invalid"
              :icon="'mdi-send'"
              :loading="isLoading"
              :text="'登録する'"
              @click="submit"
            />
          </v-col>
        </v-row>
      </ValidationObserver>
    </v-container>
    <Snackbar v-bind="snackbar" />
  </v-card>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import useNew from '@/composables/users/useNew'
import useCurrentUser from '@/utils/useCurrentUser'
import TextField from '@/components/molecules/TextField.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import Snackbar from '@/components/molecules/Snackbar.vue'
import useSnackbar from '@/utils/useSnackbar'

export default defineComponent({
  name: 'PublicProfileNew',

  components: {
    TextField,
    ButtonSubmit,
    Snackbar
  },

  layout: 'grey',

  setup() {
    const currentUser = useCurrentUser()
    const uid = currentUser.value?.uid
    const { user, get, isLoading, update } = useNew()
    const { snackbar, openSnackbar } = useSnackbar()
    const router = useRouter()
    if (uid) get(uid)

    const submit = async (): Promise<void> => {
      if (!uid) return
      const result = await update(uid)
      const message = result === 'success' ? '作成しました。' : '失敗しました。'
      openSnackbar(result, message)
      if (result === 'success') router.push('/')
    }
    return { user, isLoading, snackbar, submit }
  }
})
</script>
