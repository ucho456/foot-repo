<template>
  <v-card outlined>
    <v-card-title>
      <v-row justify="center">プロフィール編集</v-row>
    </v-card-title>
    <v-container>
      <ValidationObserver v-slot="{ invalid }">
        <v-row justify="center">
          <v-col cols="3" sm="2">
            <ImageUploaderUserImage
              :value="user.imageUrl"
              @change="changeImageUrl"
              @clear="clearImageUrl"
            />
          </v-col>
          <v-col class="mt-4" cols="7" sm="6">
            <TextField
              v-model="user.name"
              :label="'ニックネーム'"
              :maxlength="20"
              :rules="'required'"
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10" sm="6">
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
  </v-card>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import useNew from '@/composables/users/useNew'
import useCurrentUser from '@/utils/useCurrentUser'
import TextField from '@/components/molecules/TextField.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import useSnackbar from '@/utils/useSnackbar'
import ImageUploaderUserImage from '@/components/molecules/ImageUploaderUserImage.vue'

export default defineComponent({
  name: 'PublicProfileNew',

  components: {
    TextField,
    ButtonSubmit,
    ImageUploaderUserImage
  },

  layout: 'grey',

  setup() {
    const currentUser = useCurrentUser()
    const uid = currentUser.value?.uid
    const { user, getUser, changeImageUrl, clearImageUrl, isLoading, updateUser } = useNew()
    const { openSnackbar } = useSnackbar()
    const router = useRouter()
    getUser(uid)

    const submit = async (): Promise<void> => {
      if (!uid) return
      const result = await updateUser(uid)
      const message = result === 'success' ? '作成しました。' : '失敗しました。'
      openSnackbar(result, message)
      if (result === 'success') router.push('/')
    }

    return { user, isLoading, submit, changeImageUrl, clearImageUrl }
  }
})
</script>
