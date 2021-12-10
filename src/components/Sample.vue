<template>
  <div>{{ fullName }}/{{ message }}</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@nuxtjs/composition-api'
interface User {
  firstName: string
  lastName: string
}
export default defineComponent({
  name: 'Sample',
  props: {
    user: {
      type: Object as () => User,
      required: true
    }
  },
  setup(props) {
    const user = props.user
    const fullName = computed(() => `${user.firstName} ${user.lastName}`)
    const message = ref('This is a message')
    return { fullName, message }
  }
})
</script>
