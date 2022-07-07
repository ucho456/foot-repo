<template>
  <v-container>
    <v-row>
      <v-col cols="9">
        <h2>{{ h2 }}</h2>
      </v-col>
      <v-col v-if="searchButtonFlg" cols="3" class="text-right">
        <v-btn icon @click="handleSearch">
          <v-icon>{{ mdiMagnify }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-tabs v-if="tabs.length > 0" class="mb-2" fixed-tabs @change="handleTab">
      <v-tab v-for="tab in tabs" :key="tab" class="tab">{{ tab }}</v-tab>
    </v-tabs>
    <ContainerLoading :is-loading="isLoading" />
    <v-row v-if="reports.length === 0 && !isLoading">
      <v-col>対象の選手採点はありません。</v-col>
    </v-row>
    <v-list v-if="reports.length > 0 && !isLoading" class="mt-n4" three-line>
      <div v-for="report in reports" :key="report.id" class="d-flex">
        <v-list-item exact router :to="{ path: `/reports/${report.id}` }">
          <v-list-item-avatar>
            <v-img v-if="report.user.imageUrl" :lazy-src="lazy" :src="report.user.imageUrl" />
            <v-img v-else :lazy-src="lazy" :src="noAvatarImage" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{ report.title }}<span v-if="!report.publish" class="private">非公開</span>
            </v-list-item-title>
            <v-list-item-subtitle class="d-flex">
              <v-img
                max-height="14"
                max-width="14"
                :lazy-src="lazy"
                :src="report.homeTeam.imageUrl"
              />
              <span class="mx-2">{{ report.homeTeam.shortName }}</span>
              <span>{{ report.homeTeam.score }}</span>
              <span class="mx-2">vs</span>
              <span>{{ report.awayTeam.score }}</span>
              <span class="mx-2">{{ report.awayTeam.shortName }}</span>
              <v-img
                max-height="14"
                max-width="14"
                :lazy-src="lazy"
                :src="report.awayTeam.imageUrl"
              />
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{ report.jstDate }} / {{ report.competition.name }} / {{ report.matchday }}節
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-icon color="orange" size="13px">{{ mdiThumbUp }}</v-icon> {{ report.likeCount }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item-action v-if="actionFlg && report.user.id === uid">
          <v-btn icon>
            <v-icon color="primary" @click="pushToReportEdit(report.id)">{{ mdiPencil }}</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon color="failure" @click="handleDelete(report)">{{ mdiDelete }}</v-icon>
          </v-btn>
        </v-list-item-action>
      </div>
    </v-list>
  </v-container>
</template>

<script lang="ts">
/** check */
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import { mdiDelete, mdiMagnify, mdiPencil, mdiThumbUp } from '@mdi/js'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'

export default defineComponent({
  name: 'ContainerReportTable',

  components: {
    ContainerLoading
  },

  props: {
    actionFlg: { type: Boolean, default: false },
    h2: { type: String, default: '' },
    isLoading: { type: Boolean, default: false },
    reports: { type: Array as () => Report[], default: () => [] },
    searchButtonFlg: { type: Boolean, default: false },
    tabs: { type: Array as () => String[], default: () => [] },
    uid: { type: String, required: false, default: null }
  },

  setup(_, ctx) {
    const router = useRouter()
    const noAvatarImage = require('@/assets/no_avatar.png')
    const lazy = require('@/assets/lazy.png')

    const handleSearch = (): void => ctx.emit('search')
    const handleTab = (index: number): void => ctx.emit('change-tab', index)
    const handleDelete = (report: Report): void => ctx.emit('delete', report)
    const pushToReportEdit = (reportId: string): void => {
      router.push({ path: '/reports/edit', query: { reportId } })
    }

    return {
      handleDelete,
      handleSearch,
      handleTab,
      lazy,
      mdiDelete,
      mdiMagnify,
      mdiPencil,
      mdiThumbUp,
      noAvatarImage,
      pushToReportEdit
    }
  }
})
</script>

<style lang="scss" scoped>
.tab {
  text-transform: none;
}
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
