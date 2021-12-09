<template>
  <div>
    <Sample :user="user" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Sample from '@/components/Sample.vue'
export default defineComponent({
  name: 'Index',
  components: {
    Sample
  },
  setup() {
    const user = {
      firstName: 'taro',
      lastName: 'sato'
    }
    return { user }
  }
})
</script>
