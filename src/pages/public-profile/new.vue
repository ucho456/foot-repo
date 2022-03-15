<template>
  <v-container>
    {{ publicProfile }}
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useNew from '@/composables/public-profile/useNew'

export default defineComponent({
  name: 'PublicProfileNew',

  components: {},

  layout: 'white',

  setup() {
    const { publicProfile } = useNew()
    return { publicProfile }
  }
})
</script>
