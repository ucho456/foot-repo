<template>
  <v-snackbar
    :centered="true"
    :color="color"
    :text="true"
    :timeout="timeout"
    :transition="'slide-x-reverse-transition'"
    :top="true"
    :value="show"
  >
    {{ message }}
  </v-snackbar>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BaseSnackbar',

  props: {
    color: { type: String, default: '' },
    message: { type: String, default: '' },
    show: { type: Boolean, default: false },
    timeout: { type: Number, default: 0 }
  }
})
</script>
