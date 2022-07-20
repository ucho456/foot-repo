<template>
  <v-dialog max-width="380" persistent :value="isDialog">
    <v-card v-if="report">
      <v-card-title />
      <v-card-text class="o-wrap">以下の選手採点を削除しますか？ </v-card-text>
      <v-card-text class="o-wrap">タイトル：{{ report.title }} </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-container>
          <v-row justify="center">
            <v-col cols="10">
              <ButtonSubmit
                :color="'pink'"
                :is-loading="isLoading"
                :text="'削除する'"
                @click="handleDelete"
              />
            </v-col>
            <v-col cols="10">
              <ButtonOutlined :text="'閉じる'" @click="handleHide" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
/** check */
import { defineComponent } from '@nuxtjs/composition-api'
import ButtonOutlined from '@/components/molecules/ButtonOutlined.vue'
import ButtonSubmit from '@/components/molecules/ButtonSubmit.vue'

export default defineComponent({
  name: 'DialogDelete',

  components: {
    ButtonOutlined,
    ButtonSubmit
  },

  props: {
    isDialog: { type: Boolean, default: false },
    isLoading: { type: Boolean, default: false },
    report: {
      type: Object as () => Report,
      required: false,
      default: () => {
        return { title: '' }
      }
    }
  },

  setup(_, ctx) {
    const handleDelete = (): void => ctx.emit('delete')
    const handleHide = (): void => ctx.emit('hide')

    return { handleDelete, handleHide }
  }
})
</script>

<style lang="scss" scoped>
.o-wrap {
  white-space: pre-wrap;
}
</style>
