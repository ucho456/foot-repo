<template>
  <v-container>
    <v-card outlined>
      <ContainerLoading :is-loading="isLoadingSetUp" />
      <v-container v-if="!isLoadingSetUp">
        <v-row>
          <v-col>
            <h1>プロフィール登録</h1>
          </v-col>
        </v-row>
        <ValidationObserver v-slot="{ invalid }">
          <v-row class="mb-10" justify="center">
            <v-col cols="3" sm="2">
              <ImageUploaderUserImage
                :value="user.imageUrl"
                @change="changeImageUrl"
                @clear="clearImageUrl"
              />
            </v-col>
            <v-col class="mt-4" cols="7" sm="8">
              <TextField
                v-model="user.name"
                :label="'ニックネーム'"
                :maxlength="20"
                :rules="'required'"
              />
            </v-col>
            <v-col cols="10">
              <Textarea
                v-model="user.greet"
                :icon="'mdi-human-greeting-variant'"
                :label="'自己紹介文'"
                :maxlength="140"
              />
            </v-col>
            <v-col cols="10"> マイチーム </v-col>
            <v-col cols="10" sm="5">
              <SelectIdCompetition v-model="user.competitionId" />
            </v-col>
            <v-col cols="10" sm="5">
              <SelectIdTeam v-model="user.teamId" :competition-id="user.competitionId" />
            </v-col>
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
  </v-container>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import useNew from '@/composables/users/useNew'
import useSnackbar from '@/utils/useSnackbar'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import ImageUploaderUserImage from '@/components/molecules/ImageUploaderUserImage.vue'
import TextField from '@/components/molecules/TextField.vue'
import Textarea from '@/components/molecules/Textarea.vue'
import SelectIdCompetition from '@/components/molecules/SelectIdCompetition.vue'
import SelectIdTeam from '@/components/molecules/SelectIdTeam.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'

export default defineComponent({
  name: 'UserNew',

  components: {
    ContainerLoading,
    ImageUploaderUserImage,
    TextField,
    Textarea,
    SelectIdCompetition,
    SelectIdTeam,
    ButtonSubmit
  },

  layout: 'grey',

  setup() {
    const router = useRouter()
    const { user, isLoadingSetUp, setUp, changeImageUrl, clearImageUrl, isLoading, create } =
      useNew()
    const { openSnackbar } = useSnackbar()

    const setUpPage = async () => {
      const result = await setUp()
      if (result === 'failure') {
        openSnackbar(result, 'エラーが発生しました。')
      }
    }
    setUpPage()

    const submit = async (): Promise<void> => {
      const result = await create()
      const message =
        result === 'success' ? 'プロフィールを作成しました。' : 'プロフィールの作成に失敗しました。'
      openSnackbar(result, message)
      if (result === 'success') {
        router.push('/')
      }
    }

    return {
      user,
      isLoadingSetUp,
      changeImageUrl,
      clearImageUrl,
      isLoading,
      submit
    }
  }
})
</script>
