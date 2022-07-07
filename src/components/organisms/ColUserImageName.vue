<template>
  <v-col
    class="d-flex"
    :class="{ hover: userId !== 'guest' && userId !== null }"
    :cols="cols"
    :sm="sm"
    :md="md"
    @click="pushToUserShow"
  >
    <div v-if="imageUrl">
      <v-img class="rounded-circle" :height="imageSize" :src="imageUrl" :width="imageSize" />
    </div>
    <div v-else>
      <v-img class="rounded-circle" :height="imageSize" :src="noAvatarImage" :width="imageSize" />
    </div>
    <div class="ml-3 text-truncate" :style="{ 'line-height': `${imageSize}px` }">
      {{ name }}
    </div>
  </v-col>
</template>

<script lang="ts">
/** check */
import { defineComponent, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ColUserImageName',

  props: {
    cols: { type: Number, default: 12 },
    sm: { type: Number, default: 12 },
    md: { type: Number, default: 12 },
    imageSize: { type: Number, default: 36 },
    imageUrl: { type: String, required: false, default: null },
    name: { type: String, default: '' },
    userId: { type: String, required: false, default: null }
  },

  setup(props) {
    const router = useRouter()
    const noAvatarImage = require('@/assets/no_avatar.png')

    const pushToUserShow = (): void => {
      if (props.userId !== 'guest' && props.userId !== null) router.push(`/users/${props.userId}`)
    }

    return { noAvatarImage, pushToUserShow, router }
  }
})
</script>
