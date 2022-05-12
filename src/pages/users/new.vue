<template>
  <v-card outlined>
    <v-card-title>
      <v-row justify="center">プロフィール登録</v-row>
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
          <v-col class="mt-4" cols="7" sm="8">
            <TextField
              v-model="user.name"
              :label="'ニックネーム'"
              :maxlength="20"
              :rules="'required'"
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <Textarea
              v-model="user.greet"
              :icon="'mdi-human-greeting-variant'"
              :label="'自己紹介文'"
              :maxlength="140"
            />
          </v-col>
        </v-row>
        <v-row v-for="n of 3" :key="n" class="mb-10" justify="center">
          <v-col cols="10"> ◆お気に入りチーム{{ n }} </v-col>
          <v-col cols="10" sm="5">
            <SelectIdCompetition
              :value="user[`competitionId${n}`]"
              @input="inputCompetitionId($event, n)"
            />
          </v-col>
          <v-col cols="10" sm="5">
            <SelectIdTeam
              v-model="user[`teamId${n}`]"
              :competition-id="user[`competitionId${n}`]"
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
import useSnackbar from '@/utils/useSnackbar'
import ImageUploaderUserImage from '@/components/molecules/ImageUploaderUserImage.vue'
import TextField from '@/components/molecules/TextField.vue'
import Textarea from '@/components/molecules/Textarea.vue'
import SelectIdCompetition from '@/components/molecules/SelectIdCompetition.vue'
import SelectIdTeam from '@/components/molecules/SelectIdTeam.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'

export default defineComponent({
  name: 'UserNew',

  components: {
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
    const {
      isNormalAccess,
      user,
      setUpUser,
      changeImageUrl,
      clearImageUrl,
      inputCompetitionId,
      isLoading,
      create
    } = useNew()
    const { setUpCurrentUser } = useCurrentUser()
    const { openSnackbar } = useSnackbar()

    const setUp = async () => {
      await setUpUser()
      if (!isNormalAccess.value) {
        openSnackbar('alert', '不正なアクセスです。')
        router.push('/')
      }
    }
    setUp()

    const submit = async (): Promise<void> => {
      const result = await create()
      const message = result === 'success' ? '作成しました。' : '失敗しました。'
      openSnackbar(result, message)
      if (result === 'success') {
        await setUpCurrentUser()
        router.push('/')
      }
    }

    return {
      user,
      changeImageUrl,
      clearImageUrl,
      inputCompetitionId,
      isLoading,
      submit
    }
  }
})
</script>
