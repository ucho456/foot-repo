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
    const uid = route.value.params.uid
    const name = route.value.params.name
    const photoUrl = route.value.params.photoUrl
    console.log('uid', uid)
    console.log('name', name)
    console.log('photoUrl', photoUrl)
    return {}
  }
})
</script>
