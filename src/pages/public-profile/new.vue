<template>
  <v-container>
    <ValidationObserver v-slot="{ invalid }">
      <v-row justify="center">
        <v-col cols="12">
          <v-sheet>
            <v-container>
              <v-row justify="center">
                <v-col cols="10">
                  <TextField
                    v-model="publicProfile.name"
                    :label="'ニックネーム'"
                    :max-length="15"
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
            </v-container>
          </v-sheet>
        </v-col>
      </v-row>
    </ValidationObserver>
    <Snackbar v-bind="snackbar" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useNew from '@/composables/public-profile/useNew'
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
    const { publicProfile, isLoading, create } = useNew()
    const { snackbar, openSnackbar } = useSnackbar()

    const submit = async () => {
      const result = await create()
      const message = result === 'success' ? '作成しました。' : '失敗しました。'
      openSnackbar(result, message)
    }
    return { publicProfile, isLoading, snackbar, submit }
  }
})
</script>
