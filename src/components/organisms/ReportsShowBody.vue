<template>
  <v-container>
    <!-- <v-row>
      <v-col>
        <h1 class="h1">{{ title }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" md="1" sm="2">
        <v-avatar size="30px">
          <v-img :src="userImageUrl" />
        </v-avatar>
      </v-col>
      <v-col cols="9" md="11" sm="10">{{ userName }}</v-col>
    </v-row>
    <v-row v-for="drItem in dispReportItems" :key="drItem.id">
      <v-col v-if="drItem.momFlg" class="mt-n6" cols="12">☆マン・オブ・ザ・マッチ☆</v-col>
      <v-col class="mt-n6" cols="12">{{ drItem.playerInfo }}</v-col>
      <v-col class="mt-n6" cols="12">採点：{{ drItem.point }}</v-col>
      <v-col class="caption mb-5 mt-n6" cols="12">{{ drItem.text }}</v-col>
    </v-row>
    <v-row>
      <v-col class="body-1 mt-5" cols="12">総評</v-col>
      <v-col class="caption mt-n6" cols="12">{{ summary }}</v-col>
    </v-row> -->
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ReportsShowBody',

  props: {
    // dispReportItems: {
    //   type: Array as () => DispReportItem[],
    //   default: () => {
    //     return [
    //       {
    //         id: 0,
    //         playerInfo: '',
    //         point: '6.5',
    //         text: '',
    //         momFlg: false
    //       }
    //     ]
    //   }
    // },
    // summary: { type: String, default: '' },
    // title: { type: String, default: '' },
    // userId: { type: Number, default: 0 },
    // userName: { type: String, default: '' },
    // userImageUrl: { type: String, default: '' }
  }
})
</script>
