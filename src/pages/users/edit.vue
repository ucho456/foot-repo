<template>
  <v-container>
    <v-card outlined>
      <v-container>
        <v-row>
          <v-col>
            <h1>プロフィール編集</h1>
          </v-col>
        </v-row>
        <ValidationObserver v-slot="{ invalid }">
          <v-row class="mb-10" justify="center">
            <v-col cols="3" sm="2">
              <ImageUploaderUserImage :disabled="true" :value="editUser.imageUrl" />
            </v-col>
            <v-col class="mt-4" cols="7" sm="8">
              <TextField
                v-model="editUser.name"
                :disabled="true"
                :label="'ニックネーム'"
                :maxlength="20"
                :rules="'required'"
              />
            </v-col>
            <v-col cols="10">
              <Textarea v-model="editUser.greet" :label="'自己紹介文'" :maxlength="140" />
            </v-col>
            <v-col cols="10"> マイチーム </v-col>
            <v-col cols="10" sm="5">
              <SelectIdCompetition :value="editUser.competitionId" @input="inputCompetitionId" />
            </v-col>
            <v-col cols="10" sm="5">
              <SelectIdTeam v-model="editUser.team.id" :competition-id="editUser.competitionId" />
            </v-col>
            <v-col cols="10" sm="4">
              <ButtonSubmit
                :disabled="invalid"
                :is-loading="isLoadingSubmit"
                :text="'更新する'"
                @click="updateUser"
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
/** check */
import { defineComponent } from '@nuxtjs/composition-api'
import useEdit from '@/composables/users/useEdit'
import ButtonBack from '@/components/molecules/ButtonBack.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import ImageUploaderUserImage from '@/components/molecules/ImageUploaderUserImage.vue'
import SelectIdCompetition from '@/components/molecules/SelectIdCompetition.vue'
import SelectIdTeam from '@/components/molecules/SelectIdTeam.vue'
import Textarea from '@/components/molecules/Textarea.vue'
import TextField from '@/components/molecules/TextField.vue'

export default defineComponent({
  name: 'UserEdit',

  components: {
    ButtonBack,
    ButtonSubmit,
    ImageUploaderUserImage,
    SelectIdCompetition,
    SelectIdTeam,
    Textarea,
    TextField
  },

  layout: 'grey',

  setup() {
    const { back, editUser, inputCompetitionId, isLoadingSubmit, setUp, updateUser } = useEdit()

    setUp()

    return { back, editUser, inputCompetitionId, isLoadingSubmit, updateUser }
  },

  head() {
    return {
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }
})
</script>
