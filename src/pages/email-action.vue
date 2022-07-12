<template>
  <v-container>
    <v-card outlined>
      <container-loading :is-loading="true" />
    </v-card>
  </v-container>
</template>

<script lang="ts">
/** check */
import { defineComponent, useRoute, useRouter } from '@nuxtjs/composition-api'
import { getAuth } from 'firebase/auth'
import { getFunctions, httpsCallable } from 'firebase/functions'
import useSnackbar from '@/utils/useSnackbar'
import ContainerLoading from '@/components/organisms/ContainerLoading.vue'

export default defineComponent({
  name: 'EmailAction',

  components: {
    ContainerLoading
  },

  layout: 'grey',

  setup() {
    const route = useRoute()
    const router = useRouter()
    const functions = getFunctions(undefined, 'asia-northeast1')
    const { openSnackbar } = useSnackbar()

    const doEmailAction = async () => {
      const mode = route.value.query.mode
      if (mode === 'verifyEmail') {
        try {
          const updateEmailVerified = httpsCallable(functions, 'updateEmailVerified')
          await updateEmailVerified()
          await getAuth().currentUser?.reload()
          openSnackbar('success', 'メール認証が完了しました。')
          router.push('/users/new')
        } catch {
          openSnackbar('failure', 'メール認証に失敗しました。')
          router.push('/')
        }
      }
    }

    doEmailAction()
  },

  head() {
    return {
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }
})
</script>
