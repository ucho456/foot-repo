<template>
  <v-container>
    <ValidationObserver>
      <v-row justify="center">
        <v-col cols="12">
          <v-sheet>
            <v-container>
              <v-row justify="center">
                <v-col cols="10">
                  <BaseTextField
                    v-model="publicProfile.name"
                    :label="'ニックネーム'"
                    :max-length="15"
                    :rules="'required'"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-col>
      </v-row>
    </ValidationObserver>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useNew from '@/composables/public-profile/useNew'
import BaseTextField from '@/components/molecules/TextField.vue'

export default defineComponent({
  name: 'PublicProfileNew',

  components: {
    BaseTextField
  },

  layout: 'grey',

  setup() {
    const { publicProfile } = useNew()
    return { publicProfile }
  }
})
</script>
