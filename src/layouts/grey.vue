<template>
  <v-app class="o-grey">
    <v-main>
      <v-container>
        <div v-if="showable">
          <v-btn-toggle v-model="networkStatus" tile color="primary" group>
            <v-btn value="enable" @click="handleEnableNetwork"> オンラインモード </v-btn>
            <v-btn value="disable" @click="handleDisableNetwork"> オフラインモード </v-btn>
          </v-btn-toggle>
        </div>
        <Nuxt />
      </v-container>
    </v-main>
    <Snackbar v-bind="snackbar" />
  </v-app>
</template>

<script lang="ts">
/** check */
import { defineComponent } from '@nuxtjs/composition-api'
import useSnackbar from '@/utils/useSnackbar'
import useToggleOffline from '@/utils/useToggleOffline'
import Snackbar from '@/components/molecules/Snackbar.vue'

export default defineComponent({
  name: 'Grey',

  components: {
    Snackbar
  },

  setup() {
    const { snackbar } = useSnackbar()
    const { handleDisableNetwork, handleEnableNetwork, networkStatus, showable } =
      useToggleOffline()

    return { handleDisableNetwork, handleEnableNetwork, networkStatus, showable, snackbar }
  }
})
</script>

<style lang="scss" scoped>
.o-grey {
  background: #eceff1;
}
</style>
