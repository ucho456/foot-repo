<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <h2>{{ h2 }}</h2>
      </v-col>
      <v-col v-if="searchButtonFlg" cols="4" class="text-right">
        <v-btn icon @click="handleClick">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="reports.length === 0">
      <v-col>選手採点はまだありません。</v-col>
    </v-row>
    <v-list class="mt-n4" three-line>
      <v-container v-for="report in reports" :key="report.id">
        <v-list-item :exact="true" :router="true" :to="{ path: `reports/${report.id}` }">
          <v-list-item-avatar class="avatar">
            <v-img v-if="report.user.imageUrl" :src="report.user.imageUrl" />
            <v-img v-else :src="noAvatarImage" />
          </v-list-item-avatar>
          <div class="name">{{ report.user.name }}</div>
          <v-list-item-content class="ml-n3">
            <v-list-item-title>{{ report.title }}</v-list-item-title>
            <v-list-item-subtitle class="d-flex">
              <v-img
                class="rounded-circle"
                :max-height="14"
                :max-width="14"
                :src="report.homeTeam.imageUrl"
              />
              <span class="ml-2 mr-2">{{ report.homeTeam.shortName }}</span>
              <span>{{ report.homeTeam.score }}</span>
              <span class="ml-2 mr-2">vs</span>
              <span>{{ report.awayTeam.score }}</span>
              <span class="ml-2 mr-2">{{ report.awayTeam.shortName }}</span>
              <v-img
                class="rounded-circle"
                :max-height="14"
                :max-width="14"
                :src="report.awayTeam.imageUrl"
              />
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{ report.competition.name }} / {{ report.jstDate }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-container>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ContainerReportTable',

  props: {
    h2: { type: String, default: '選手採点' },
    reports: { type: Array as () => Report[], default: () => [] },
    searchButtonFlg: { type: Boolean, default: false }
  },

  setup(_, ctx) {
    const noAvatarImage = require('@/assets/no_avatar.png')

    const handleClick = (): void => {
      ctx.emit('click')
    }

    return { noAvatarImage, handleClick }
  }
})
</script>

<style scoped>
.avatar {
  position: absolute;
}
.name {
  position: relative;
  top: 20px;
  right: 15px;
  font-size: 10px;
  width: 70px;
  text-align: center;
  overflow: hidden;
}
</style>
