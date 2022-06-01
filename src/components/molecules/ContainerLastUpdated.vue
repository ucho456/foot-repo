<template>
  <v-container>
    <v-row>
      <v-col class="last-updated">最終更新日：{{ convertLastUpdated }}</v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    lastUpdated: { type: String, default: '' }
  },

  setup(props) {
    const lastUpdated = new Date(props.lastUpdated)
    const year = String(lastUpdated.getFullYear())
    const month = String(lastUpdated.getMonth() + 1).padStart(2, '0')
    const date = String(lastUpdated.getDate()).padStart(2, '0')
    const convertLastUpdated = `${year}-${month}-${date}`

    return { convertLastUpdated }
  }
})
</script>

<style lang="scss" scoped>
.last-updated {
  font-size: 10px;
  text-align: right;
}
</style>
