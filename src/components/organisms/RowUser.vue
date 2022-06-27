<template>
  <v-row>
    <v-col cols="12" class="d-flex">
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
      <div v-if="buttonTextRight" :style="{ 'margin-top': `${imageSize / 4}px` }">
        <ButtonOutlined :text="buttonTextRight" @click="handleClick" />
      </div>
    </v-col>
    <v-col v-if="buttonTextBottom" cols="4">
      <ButtonOutlined :text="buttonTextBottom" @click="handleClick" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import ButtonOutlined from '@/components/molecules/ButtonOutlined.vue'

export default defineComponent({
  name: 'RowUser',

  components: {
    ButtonOutlined
  },

  props: {
    buttonTextBottom: { type: String, default: '' },
    buttonTextRight: { type: String, default: '' },
    comment: { type: String, required: false, default: null },
    greet: { type: String, required: false, default: null },
    id: { type: String, required: false, default: null },
    imageSize: { type: Number, default: 30 },
    imageUrl: { type: String, required: false, default: null },
    name: { type: String, default: '' },
    teamName: { type: String, required: false, default: null }
  },

  setup(props, ctx) {
    const router = useRouter()
    const noAvatarImage = require('@/assets/no_avatar.png')

    const pushToUserShow = () => {
      if (props.id !== 'guest' && props.id !== null) router.push(`/users/${props.id}`)
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
