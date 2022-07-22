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
        <span class="o-note"> ※プロフィール写真とニックネームは後から変更ができません。 </span>
        <ValidationObserver v-slot="{ invalid }">
          <v-row class="mb-10 mt-4" justify="center">
            <v-col cols="3" sm="2">
              <ImageUploaderUserImage
                :value="newUser.imageUrl"
                @change="changeImageUrl"
                @clear="clearImageUrl"
              />
            </v-col>
            <v-col cols="7" sm="8" class="mt-4">
              <TextField
                v-model="newUser.name"
                :label="'ニックネーム'"
                :maxlength="20"
                :rules="'required'"
              />
            </v-col>
            <v-col cols="10">
              <Textarea v-model="newUser.greet" :label="'自己紹介文'" :maxlength="140" />
            </v-col>
            <v-col cols="10"> マイチーム </v-col>
            <v-col cols="10" sm="5">
              <SelectIdCompetition
                :league-only="true"
                :value="newUser.competitionId"
                @input="inputCompetitionId"
              />
            </v-col>
            <v-col cols="10" sm="5">
              <SelectIdTeam v-model="newUser.team.id" :competition-id="newUser.competitionId" />
            </v-col>
            <v-col cols="10" sm="6">
              <ButtonSubmit
                :disabled="invalid"
                :is-loading="isLoadingCreate"
                :text="'登録する'"
                @click="createUser"
              />
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
import useNew from '@/composables/users/useNew'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'
import ImageUploaderUserImage from '@/components/molecules/ImageUploaderUserImage.vue'
import SelectIdCompetition from '@/components/molecules/SelectIdCompetition.vue'
import SelectIdTeam from '@/components/molecules/SelectIdTeam.vue'
import Textarea from '@/components/molecules/Textarea.vue'
import TextField from '@/components/molecules/TextField.vue'

export default defineComponent({
  name: 'UserNew',

  components: {
    ButtonSubmit,
    ContainerLoading,
    ImageUploaderUserImage,
    SelectIdCompetition,
    SelectIdTeam,
    Textarea,
    TextField
  },

  layout: 'grey',

  setup() {
    const {
      changeImageUrl,
      clearImageUrl,
      createUser,
      inputCompetitionId,
      isLoadingCreate,
      isLoadingSetUp,
      newUser,
      setUp
    } = useNew()

    setUp()

    return {
      changeImageUrl,
      clearImageUrl,
      createUser,
      inputCompetitionId,
      isLoadingCreate,
      isLoadingSetUp,
      newUser
    }
  },

  head() {
    return {
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }
})
</script>

<style lang="scss" scoped>
.o-note {
  font-size: 12px;
  color: red;
}
</style>
