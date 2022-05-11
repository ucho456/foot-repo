<template>
  <v-app class="grey">
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <Snackbar v-bind="snackbar" />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useSnackbar from '@/utils/useSnackbar'
import Snackbar from '@/components/molecules/Snackbar.vue'

export default defineComponent({
  name: 'Grey',

  components: {
    Snackbar
  },

  setup() {
    const { snackbar } = useSnackbar()
    return { snackbar }
  }
})
</script>

<style lang="scss" scoped>
.grey {
  background: #eceff1;
}
</style>
