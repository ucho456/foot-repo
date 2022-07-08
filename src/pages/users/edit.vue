<template>
  <v-container>
    <v-card outlined>
      <ContainerLoading :is-loading="isLoadingSetUp" />
      <v-container v-if="!isLoadingSetUp">
        <v-row>
          <v-col>
            <h1>プロフィール編集</h1>
          </v-col>
        </v-row>
        <ValidationObserver v-slot="{ invalid }">
          <v-row class="mb-10" justify="center">
            <v-col cols="3" sm="2">
              <ImageUploaderUserImage
                :disabled="true"
                :value="inputUser.imageUrl"
                @change="changeImageUrl"
                @clear="clearImageUrl"
              />
            </v-col>
            <v-col class="mt-4" cols="7" sm="8">
              <TextField
                v-model="inputUser.name"
                :disabled="true"
                :label="'ニックネーム'"
                :maxlength="20"
                :rules="'required'"
              />
            </v-col>
            <v-col cols="10">
              <Textarea v-model="inputUser.greet" :label="'自己紹介文'" :maxlength="140" />
            </v-col>
            <v-col cols="10"> マイチーム </v-col>
            <v-col cols="10" sm="5">
              <SelectIdCompetition :value="inputUser.competitionId" @input="inputCompetitionId" />
            </v-col>
            <v-col cols="10" sm="5">
              <SelectIdTeam v-model="inputUser.team.id" :competition-id="inputUser.competitionId" />
            </v-col>
            <v-col cols="10" sm="4">
              <ButtonSubmit
                :disabled="invalid"
                :is-loading="isLoadingSubmit"
                :text="'更新する'"
                @click="submit"
              />
            </v-col>
            <v-col cols="10" sm="4">
              <ButtonBack :disabled="isLoadingSubmit" @click="back" />
            </v-col>
          </v-row>
        </ValidationObserver>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import useEdit from '@/composables/users/useEdit'
import useLoginUser from '@/utils/useLoginUser'
import useSnackbar from '@/utils/useSnackbar'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import ImageUploaderUserImage from '@/components/molecules/ImageUploaderUserImage.vue'
import TextField from '@/components/molecules/TextField.vue'
import Textarea from '@/components/molecules/Textarea.vue'
import SelectIdCompetition from '@/components/molecules/SelectIdCompetition.vue'
import SelectIdTeam from '@/components/molecules/SelectIdTeam.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import ButtonBack from '@/components/molecules/ButtonBack.vue'

export default defineComponent({
  name: 'UserEdit',

  components: {
    ContainerLoading,
    ImageUploaderUserImage,
    TextField,
    Textarea,
    SelectIdCompetition,
    SelectIdTeam,
    ButtonSubmit,
    ButtonBack
  },

  layout: 'grey',

  setup() {
    const router = useRouter()
    const {
      inputUser,
      isLoadingSetUp,
      setUp,
      changeImageUrl,
      clearImageUrl,
      inputCompetitionId,
      isLoadingSubmit,
      update
    } = useEdit()
    const { loginUser } = useLoginUser()
    const { openSnackbar } = useSnackbar()

    const setUpPage = async (): Promise<void> => {
      const result = await setUp()
      if (result === 'failure') {
        openSnackbar(result, '通信エラーが発生しました。')
      } else if (result === 'unauthorized access') {
        openSnackbar(result, '不正なアクセスが発生した為、ホーム画面に遷移しました。')
        router.push('/')
      }
    }
    setUpPage()

    const submit = async (): Promise<void> => {
      const result = await update()
      const message =
        result === 'success' ? 'プロフィールを更新しました。' : 'プロフィールの更新に失敗しました。'
      openSnackbar(result, message)
      if (result === 'success') {
        router.push(`/users/${loginUser.value?.uid!}`)
      }
    }

    const back = (): void => {
      router.back()
    }

    return {
      inputUser,
      isLoadingSetUp,
      changeImageUrl,
      clearImageUrl,
      inputCompetitionId,
      isLoadingSubmit,
      submit,
      back
    }
  },

  head() {
    return {
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }
})
</script>
