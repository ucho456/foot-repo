<template>
  <v-row>
    <v-col class="d-flex">
      <div v-if="imageUrl">
        <v-img class="rounded-circle" :height="30" :width="30" :src="imageUrl" />
      </div>
      <div v-else>
        <v-img class="rounded-circle" :height="30" :width="30" :src="noAvatarImage" />
      </div>
      <div class="ml-2 name">{{ name }}</div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'RowUserImageName',

  props: {
    imageUrl: { type: String, required: false, default: null },
    name: { type: String, default: '' }
  },

  setup() {
    const noAvatarImage = require('@/assets/no_avatar.png')

    return { noAvatarImage }
  }
})
</script>

<style lang="scss" scoped>
.name {
  line-height: 30px;
}
</style>
