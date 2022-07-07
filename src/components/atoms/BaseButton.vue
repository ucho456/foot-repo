<template>
  <v-btn
    class="v-btn"
    :block="blockFlg"
    :class="{ 'white--text': whiteTextFlg }"
    :color="color"
    :disabled="disabled"
    :icon="iconFlg"
    :loading="isLoading"
    :outlined="outlinedFlg"
    :text="textFlg"
    @click="handleClick"
  >
    <v-icon :left="leftFlg">{{ icon }}</v-icon>
    <v-img v-if="image" class="mr-2" max-height="18" max-width="18" :src="image" />
    {{ text }}
  </v-btn>
</template>

<script lang="ts">
/** check */
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BaseButton',

  props: {
    blockFlg: { type: Boolean, default: false },
    color: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    icon: { type: String, default: '' },
    iconFlg: { type: Boolean, default: false },
    image: { type: String, default: '' },
    isLoading: { type: Boolean, default: false },
    leftFlg: { type: Boolean, default: false },
    outlinedFlg: { type: Boolean, default: false },
    text: { type: String, default: '' },
    textFlg: { type: Boolean, default: false },
    whiteTextFlg: { type: Boolean, default: false }
  },

  setup(_, ctx) {
    const handleClick = (): void => ctx.emit('click')

    return { handleClick }
  }
})
</script>

<style lang="scss" scoped>
.v-btn {
  text-transform: none;
}
</style>
