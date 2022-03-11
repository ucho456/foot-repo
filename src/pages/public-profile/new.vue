<template>
  <div>aaaaa</div>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'

export default defineComponent({
  name: '',
  components: {},
  props: {},
  setup() {
    const route = useRoute()
    const initCurrentUser = route.value.params.initCurrentUser
    console.log(initCurrentUser)
    return {}
  }
})
</script>
