<template>
  <v-dialog :max-width="380" persistent :value="isDialog">
    <v-card v-if="report">
      <v-card-title />
      <v-card-text class="wrap">以下の選手採点を削除しますか？</v-card-text>
      <v-card-text class="wrap">タイトル：{{ report.title }}</v-card-text>
      <v-card-text class="wrap">試合日：{{ report.jstDate }}</v-card-text>
      <v-card-text class="wrap">コンペティション：{{ report.competition.name }}</v-card-text>
      <v-card-text class="wrap">ホーム：{{ report.homeTeam.name }}</v-card-text>
      <v-card-text class="wrap">アウェイ：{{ report.awayTeam.name }}</v-card-text>
      <v-divider />
      <v-card-actions>
        <v-container>
          <v-row justify="center">
            <v-col cols="10">
              <v-btn
                block
                color="failure"
                class="white--text"
                :loading="isLoading"
                @click="handleDelete"
                >削除する</v-btn
              >
            </v-col>
            <v-col cols="10">
              <v-btn block color="primary" outlined @click="handleClose">閉じる</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DialogDelete',

  props: {
    isDialog: { type: Boolean, default: false },
    isLoading: { type: Boolean, default: false },
    report: {
      type: Object as () => Report,
      required: false,
      default: () => {
        return {
          title: '',
          jstDate: '',
          competition: { name: '' },
          homeTeam: { name: '' },
          awayTeam: { name: '' }
        }
      }
    }
  },

  setup(_, ctx) {
    const handleDelete = (): void => {
      ctx.emit('delete')
    }
    const handleClose = (): void => {
      ctx.emit('close')
    }

    return { handleDelete, handleClose }
  }
})
</script>

<style lang="scss" scoped>
.wrap {
  white-space: pre-wrap;
}
</style>
