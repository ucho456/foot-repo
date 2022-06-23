<template>
  <v-row>
    <v-col class="d-flex">
      <div v-if="imageUrl" :class="{ hover: id !== null }">
        <v-img
          class="rounded-circle"
          :height="imageSize"
          :width="imageSize"
          :src="imageUrl"
          @click="pushToUserShow"
        />
      </div>
      <div v-else :class="{ hover: id !== 'guest' && id !== null }">
        <v-img
          class="rounded-circle"
          :height="imageSize"
          :width="imageSize"
          :src="noAvatarImage"
          @click="pushToUserShow"
        />
      </div>
      <div class="ml-3">
        <div class="name">{{ name }}</div>
        <div v-if="teamName">{{ teamName }}</div>
        <div v-if="greet">{{ greet }}</div>
        <div v-if="comment">{{ comment }}</div>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'RowUser',

  props: {
    comment: { type: String, required: false, default: null },
    id: { type: String, required: false, default: null },
    imageUrl: { type: String, required: false, default: null },
    imageSize: { type: Number, default: 30 },
    name: { type: String, default: '' },
    teamName: { type: String, required: false, default: null },
    greet: { type: String, required: false, default: null }
  },

  setup(props) {
    const router = useRouter()
    const noAvatarImage = require('@/assets/no_avatar.png')

    const pushToUserShow = () => {
      if (props.id !== 'guest' && props.id !== null) {
        router.push(`/users/${props.id}`)
      }
    }

    return { noAvatarImage, pushToUserShow }
  }
})
</script>

<style lang="scss" scoped>
.name {
  font-size: 18px;
  line-height: 30px;
}
</style>
