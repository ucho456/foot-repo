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
            <v-list-item-title class="title"
              >{{ report.title
              }}<span v-if="!report.publish" class="private">非公開</span></v-list-item-title
            >
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
            <v-icon color="primary" @click="pushToReportEdit(report.id)">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon color="failure" @click="handleDelete(report)">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </div>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ContainerReportTable',

  props: {
    actionFlg: { type: Boolean, default: false },
    h2: { type: String, default: '' },
    reports: { type: Array as () => Report[], default: () => [] },
    searchButtonFlg: { type: Boolean, default: false }
  },

  setup(_, ctx) {
    const router = useRouter()
    const noAvatarImage = require('@/assets/no_avatar.png')

    const handleSearch = (): void => {
      ctx.emit('search')
    }
    const pushToReportEdit = (reportId: string): void => {
      router.push({ path: '/reports/edit', query: { reportId } })
    }
    const handleDelete = (report: Report): void => {
      ctx.emit('delete', report)
    }

    return { noAvatarImage, handleSearch, pushToReportEdit, handleDelete }
  }
})
</script>

<style lang="scss" scoped>
.title {
  font-size: 15px !important;
  text-overflow: inherit;
  white-space: unset;
}
.private {
  color: #1a237e;
  background-color: #{$light-indigo};
  border-radius: 5px;
  margin-left: 10px;
}
</style>
