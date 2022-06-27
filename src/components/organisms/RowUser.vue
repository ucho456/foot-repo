<template>
  <v-row>
    <v-col cols="12" class="d-flex">
      <div v-if="imageUrl" :class="{ hover: userId !== null }">
        <v-img
          class="rounded-circle"
          :height="imageSize"
          :width="imageSize"
          :src="imageUrl"
          @click="pushToUserShow"
        />
      </div>
      <div v-else :class="{ hover: userId !== 'guest' && userId !== null }">
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
      <div v-if="uid && rightFlg" :style="{ 'margin-top': `${imageSize / 4}px` }">
        <ButtonFollow :follow="follow" :uid="uid" :user-id="userId" @click="handleClick" />
      </div>
    </v-col>
    <v-col v-if="uid && bottomFlg" cols="4">
      <ButtonFollow :follow="follow" :uid="uid" :user-id="userId" @click="handleClick" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import ButtonFollow from '@/components/molecules/ButtonFollow.vue'

export default defineComponent({
  name: 'RowUser',

  components: {
    ButtonFollow
  },

  props: {
    bottomFlg: { type: Boolean, default: false },
    comment: { type: String, required: false, default: null },
    follow: { type: Boolean, default: false },
    greet: { type: String, required: false, default: null },
    imageSize: { type: Number, default: 30 },
    imageUrl: { type: String, required: false, default: null },
    name: { type: String, default: '' },
    rightFlg: { type: Boolean, default: false },
    teamName: { type: String, required: false, default: null },
    uid: { type: String, required: false, default: null },
    userId: { type: String, required: false, default: null }
  },

  setup(props, ctx) {
    const router = useRouter()
    const noAvatarImage = require('@/assets/no_avatar.png')

    const pushToUserShow = () => {
      if (props.userId !== 'guest' && props.userId !== null) router.push(`/users/${props.userId}`)
    }
    const handleClick = (): void => ctx.emit('click')

    return { noAvatarImage, pushToUserShow, handleClick }
  }
})
</script>

<style lang="scss" scoped>
.name {
  font-size: 18px;
  line-height: 30px;
}
</style>
