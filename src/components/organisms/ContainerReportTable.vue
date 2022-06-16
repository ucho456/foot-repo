<template>
  <v-container>
    <v-row>
      <v-col cols="9"
        ><h2>{{ h2 }}</h2></v-col
      >
      <v-col v-if="searchButtonFlg" cols="3" class="text-right">
        <v-btn icon @click="handleSearch">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="reports.length === 0">
      <v-col>対象の選手採点はありません。</v-col>
    </v-row>
    <v-list class="mt-n4" three-line>
      <div v-for="report in reports" :key="report.id" class="d-flex">
        <v-list-item exact router :to="{ path: `/reports/${report.id}` }">
          <v-list-item-avatar>
            <v-img v-if="report.user.imageUrl" :src="report.user.imageUrl" />
            <v-img v-else :src="noAvatarImage" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ report.title }}</v-list-item-title>
            <v-list-item-subtitle class="d-flex">
              <v-img :max-height="14" :max-width="14" :src="report.homeTeam.imageUrl" />
              <span class="ml-2 mr-2">{{ report.homeTeam.shortName }}</span>
              <span>{{ report.homeTeam.score }}</span>
              <span class="ml-2 mr-2">vs</span>
              <span>{{ report.awayTeam.score }}</span>
              <span class="ml-2 mr-2">{{ report.awayTeam.shortName }}</span>
              <v-img :max-height="14" :max-width="14" :src="report.awayTeam.imageUrl" />
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{ report.jstDate }} / {{ report.competition.name }} / {{ report.matchday }}節
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item-action v-if="actionFlg">
          <v-btn icon>
            <v-icon color="primary" @click="handleEdit(report.id)">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon color="failure" @click="handleDelete(report.id)">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </div>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ContainerReportTable',

  props: {
    actionFlg: { type: Boolean, default: false },
    h2: { type: String, default: '' },
    reports: { type: Array as () => Report[], default: () => [] },
    searchButtonFlg: { type: Boolean, default: false }
  },

  setup(_, ctx) {
    const noAvatarImage = require('@/assets/no_avatar.png')

    const handleSearch = (): void => {
      ctx.emit('search')
    }
    const handleEdit = (reportId: string): void => {
      ctx.emit('edit', reportId)
    }
    const handleDelete = (reportId: string): void => {
      ctx.emit('delete', reportId)
    }

    return { noAvatarImage, handleSearch, handleEdit, handleDelete }
  }
})
</script>
