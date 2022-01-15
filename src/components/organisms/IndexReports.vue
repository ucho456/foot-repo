<template>
  <v-sheet>
    <v-toolbar flat>
      <v-toolbar-title>レポート一覧</v-toolbar-title>
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
      <template v-for="report in reports">
        <v-list-item :key="report.id" :to="report.to" exact router>
          <v-list-item-avatar>
            <v-img v-if="report.avatar !== ''" :src="report.avatar"></v-img>
            <v-img v-else :src="noAvatarImg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ report.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ report.userName }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ report.description }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

interface Reports {
  id: number
  avatar: string
  title: string
  userName: string
  description: string
  to: string
}

export default defineComponent({
  name: 'IndexReports',

  props: {
    err: { type: String, default: '' },
    isLoading: { type: Boolean, default: false },
    reports: {
      type: Array as () => Reports[],
      default: () => [{ id: 0, avatar: '', title: '', userName: '', description: '', to: '' }]
    }
  },

  setup(_, ctx) {
    const handleClick = (): void => ctx.emit('click')
    const noAvatarImg = require('@/assets/no_avatar.png')
    return { handleClick, noAvatarImg }
  }
})
</script>
