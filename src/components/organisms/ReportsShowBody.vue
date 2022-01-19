<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="h1">{{ title }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" md="1" sm="2">
        <v-avatar size="30px">
          <v-img :src="user.imageUrl" />
        </v-avatar>
      </v-col>
      <v-col class="user-name" cols="9" sm="10" md="11">{{ user.name }}</v-col>
    </v-row>
    <v-row v-for="reportItem in reportItems" :key="reportItem.id">
      <v-col v-if="reportItem.momFlg" class="mt-n6" cols="12">☆マン・オブ・ザ・マッチ☆</v-col>
      <v-col class="mt-n6" cols="12">{{ reportItem.playerInformation }}</v-col>
      <v-col class="mt-n6" cols="12">採点：{{ reportItem.point }}</v-col>
      <v-col class="mt-n6 mb-5 caption" cols="12">{{ reportItem.text }}</v-col>
    </v-row>
    <v-row>
      <v-col class="mt-5 body-1" cols="12">総評</v-col>
      <v-col class="mt-n6 caption" cols="12">{{ summary }}</v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

interface ReportItemForShow {
  id: number
  playerInformation: string
  point: string
  text: string
  momFlg: boolean
}

export default defineComponent({
  name: 'ReportsShowBody',

  props: {
    reportItems: {
      type: Array as () => ReportItemForShow,
      default: () => {
        return [
          {
            id: 0,
            playerInformation: '',
            point: '6.5',
            text: '',
            momFlg: false
          }
        ]
      }
    },
    summary: { type: String, default: '' },
    title: { type: String, default: '' },
    user: {
      type: Object as () => User,
      default: () => {
        return {
          id: 0,
          name: '',
          imageUrl: ''
        }
      }
    }
  }
})
</script>
