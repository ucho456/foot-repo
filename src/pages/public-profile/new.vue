<template>
  <div>aaaaa</div>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PublicProfileNew',

  components: {},

  layout: 'noside',

  setup() {
    const route = useRoute()
    const initCurrentUser = route.value.params.initCurrentUser as InitCurrentUser
    console.log(initCurrentUser)
    return {}
  }
})
</script>
