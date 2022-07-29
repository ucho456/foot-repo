<template>
  <v-container>
    <!-- <v-card outlined>
      <v-container>
        <v-row>
          <v-col>
            <div class="gcse-search"></div>
          </v-col>
        </v-row>
      </v-container>
    </v-card> -->
    <v-card outlined>
      <v-container>
        <v-row>
          <v-col cols="12">
            相互リンクパートナー・広告スポンサーを募集中です。
            <a
              ref="nofollow"
              class="o-hover"
              href="https://twitter.com/messages/compose?recipient_id=1500667275937927171"
              target="_blank"
            >
              こちら
            </a>
            よりご連絡お待ちしております。
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card class="mt-4" outlined>
      <v-container>
        <v-row>
          <v-col cols="12">
            <h3>人気の選手採点</h3>
          </v-col>
          <v-col
            v-for="report in reports"
            :key="report.id"
            cols="12"
            class="mt-n3 o-hover"
            @click="pushToReportShow(report.id)"
          >
            <div class="line-1">
              {{ report.title }}
            </div>
            <div class="d-flex line-2">
              <v-img class="team-image" :lazy-src="lazy" :src="report.homeTeam.imageUrl" />
              <span class="mx-2">{{ report.homeTeam.shortName }}</span>
              <span>{{ report.homeTeam.score }}</span>
              <span class="mx-2">vs</span>
              <span>{{ report.awayTeam.score }}</span>
              <span class="mx-2">{{ report.awayTeam.shortName }}</span>
              <v-img class="team-image" :lazy-src="lazy" :src="report.awayTeam.imageUrl" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api'
import { fetchPopularReports } from '@/db/reports'

export default defineComponent({
  name: 'SideContainer',

  setup() {
    const router = useRouter()
    const lazy = require('@/assets/lazy.png')
    /** サンプル。詳しい設定はまたやる。 */
    // const createGoogleSearchScript = (): void => {
    //   const script = document.createElement('script')
    //   script.setAttribute('src', 'https://cse.google.com/cse.js?cx=396e2ac1911b23488')
    //   script.setAttribute('async', 'true')
    //   document.head.appendChild(script)
    // }
    // if (process.client) {
    // createGoogleSearchScript()
    // }
    const reports = ref<Report[]>([])
    const setUpReports = async () => {
      reports.value = await fetchPopularReports()
    }
    setUpReports()
    const pushToReportShow = (reportId: string): void => {
      router.push(`/reports/${reportId}`)
    }

    return { lazy, pushToReportShow, reports }
  }
})
</script>

<style lang="scss" scoped>
.line-1 {
  font-size: 13px !important;
  line-height: 13px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.line-2 {
  font-size: 13px !important;
  padding-bottom: 6px;
  border-bottom: 1px solid #e8eaf6;
}
.team-image {
  margin-top: 2px;
  max-width: 13px;
  max-height: 13px;
}
</style>
