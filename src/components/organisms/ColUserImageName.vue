<template>
  <v-col
    :cols="cols"
    :class="{ 'd-flex': true, hover: userId !== 'guest' && userId !== null }"
    @click="pushToUserShow"
  >
    <div v-if="imageUrl">
      <v-img class="rounded-circle" :height="imageSize" :width="imageSize" :src="imageUrl" />
    </div>
    <div v-else>
      <v-img class="rounded-circle" :height="imageSize" :width="imageSize" :src="noAvatarImage" />
    </div>
    <div class="ml-3 text-truncate" :style="{ 'line-height': `${imageSize}px` }">
      {{ name }}
    </div>
  </v-col>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ColUserImageName',

  components: {},

  props: {
    cols: { type: Number, default: 0 },
    imageSize: { type: Number, default: 36 },
    imageUrl: { type: String, required: false, default: null },
    name: { type: String, default: '' },
    userId: { type: String, required: false, default: null }
  },

  setup(props) {
    const router = useRouter()
    const noAvatarImage = require('@/assets/no_avatar.png')

    const pushToUserShow = () => {
      if (props.userId !== 'guest' && props.userId !== null) router.push(`/users/${props.userId}`)
    }

    return { router, noAvatarImage, pushToUserShow }
  }
})
</script>
