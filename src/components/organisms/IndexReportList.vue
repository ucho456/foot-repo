<template>
  <v-sheet>
    <v-toolbar flat>
      <v-toolbar-title>選手採点一覧</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="handleClick">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container v-if="isLoading" class="pb-10">
      <v-row justify="center">
        <v-progress-circular color="darkBlue" indeterminate />
      </v-row>
    </v-container>
    <v-list v-else class="mt-n4" three-line>
      <v-container v-if="err" class="mt-4">
        <v-row justify="center">
          {{ err }}
        </v-row>
      </v-container>
      <template v-for="rItem in reportList">
        <v-list-item :key="rItem.id" exact router :to="rItem.to">
          <v-list-item-avatar>
            <v-img v-if="rItem.userImageUrl !== ''" :src="rItem.userImageUrl"></v-img>
            <v-img v-else :src="noAvatarImage"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ rItem.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ rItem.userName }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ rItem.description }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'IndexReportList',

  props: {
    err: { type: String, default: '' },
    isLoading: { type: Boolean, default: false },
    reportList: {
      type: Array as () => ReportListItem[],
      default: () => [{ id: 0, title: '', userName: '', userImageUrl: '', description: '', to: '' }]
    }
  },

  setup(_, ctx) {
    const handleClick = (): void => ctx.emit('click')
    const noAvatarImage = require('@/assets/no_avatar.png')
    return { handleClick, noAvatarImage }
  }
})
</script>
