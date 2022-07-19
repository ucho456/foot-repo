<template>
  <v-snackbar
    centered
    top
    :color="color"
    :value="show"
    :timeout="-1"
    :transition="'slide-x-reverse-transition'"
  >
    <span :style="`color: ${textColor}`">{{ message }}</span>
    <template #action="{ attrs }">
      <v-btn icon v-bind="attrs" @click="closeSnackbar">
        <v-icon>{{ mdiClose }}</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
/** check */
import { defineComponent } from '@nuxtjs/composition-api'
import { mdiClose } from '@mdi/js'
import useSnackbar from '@/utils/useSnackbar'

export default defineComponent({
  name: 'Snackbar',

  props: {
    color: { type: String, default: '' },
    message: { type: String, default: '' },
    show: { type: Boolean, default: false },
    textColor: { type: String, default: '' }
  },

  setup() {
    const { closeSnackbar } = useSnackbar()

    return { closeSnackbar, mdiClose }
  }
})
</script>
