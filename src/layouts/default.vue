<template>
  <v-app class="o-light-indigo">
    <v-app-bar class="white--text" app color="#1a237e" fixed height="56">
      <v-container class="align-center d-flex">
        <v-toolbar-title>
          <img
            alt="フットレポ"
            class="o-hover"
            height="44"
            width="202"
            :src="headerLogo"
            @click="pushToHome"
          />
        </v-toolbar-title>
        <v-spacer />
        <v-btn aria-label="メニュー" icon @click.stop="showDrawer">
          <v-icon color="white">{{ mdiMenu }}</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" sm="8"><Nuxt /></v-col>
          <v-col cols="12" sm="4"><SideContainer /></v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer class="white--text" absolute app color="#263238">
      <v-container>
        <v-row>
          <v-col cols="6">
            <span>&copy; {{ new Date().getFullYear() }}</span>
          </v-col>
          <v-col class="text-right" cols="6">
            <div class="o-hover o-font-10" @click="show('terms')">利用規約</div>
            <div class="o-hover o-font-10" @click="show('privacy policy')">
              プライバシーポリシー
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
    <v-navigation-drawer v-model="isDrawer" fixed right temporary>
      <client-only>
        <v-list-item v-if="loginUser" :to="`/users/${loginUser.uid}`">
          <v-list-item-avatar>
            <v-img v-if="loginUser.imageUrl" :lazy-src="lazy" :src="loginUser.imageUrl" />
            <v-img v-else :lazy-src="lazy" :src="noAvatarImage" />
          </v-list-item-avatar>
          <v-list-item-content class="ml-3">
            <v-list-item-title v-text="loginUser.name" />
          </v-list-item-content>
        </v-list-item>
        <v-list>
          <v-list-item
            v-for="item in navigationDrawerItems"
            :key="item.id"
            exact
            router
            :to="item.to"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content class="ml-3">
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="loginUser" class="ml-2 px-2" @click="logout">
            <v-list-item-action>
              <v-icon>{{ mdiLogout }}</v-icon>
            </v-list-item-action>
            <v-list-item-content class="ml-3">
              <v-list-item-title v-text="'ログアウト'" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </client-only>
    </v-navigation-drawer>
    <Snackbar v-bind="snackbar" />
    <DialogTerms :is-dialog="dialogTerms" @hide="hide('terms')" />
    <DialogPrivacyPolicy :dialog="dialogPrivacyPolicy" @hide="hide('privacy policy')" />
  </v-app>
</template>

<script lang="ts">
/** check */
import { computed, defineComponent, ref, useRouter } from '@nuxtjs/composition-api'
import { getAuth, signOut } from 'firebase/auth'
import {
  mdiAccountPlus,
  mdiAccountSearch,
  mdiChartBar,
  mdiFaceAgent,
  mdiHome,
  mdiInformation,
  mdiLogin,
  mdiLogout,
  mdiMenu,
  mdiPencilPlus
} from '@mdi/js'
import useLoginUser from '@/utils/useLoginUser'
import useSnackbar from '@/utils/useSnackbar'
import SideContainer from '@/components/organisms/SideContainer.vue'

export default defineComponent({
  name: 'Default',

  components: {
    DialogPrivacyPolicy: () => import('@/components/organisms/DialogPrivacyPolicy.vue'),
    DialogTerms: () => import('@/components/organisms/DialogTerms.vue'),
    SideContainer,
    Snackbar: () => import('@/components/molecules/Snackbar.vue')
  },

  setup() {
    const router = useRouter()
    const { loginUser } = useLoginUser()
    const { snackbar, openSnackbar } = useSnackbar()
    const headerLogo = require('@/assets/header_logo.png')
    const noAvatarImage = require('@/assets/no_avatar.png')
    const lazy = require('@/assets/lazy.png')

    const pushToHome = (): void => {
      router.push('/')
    }

    const navigationDrawerItems = computed(() => {
      const home = { icon: mdiHome, title: 'ホーム', to: '/' }
      const reportNew = { icon: mdiPencilPlus, title: '選手採点投稿', to: '/reports/search' }
      const database = { icon: mdiChartBar, title: 'データベース', to: '/databases/' }
      const users = { icon: mdiAccountSearch, title: 'ユーザー検索', to: '/users' }
      // const chatRoom = { icon: 'mdi-chat-processing', title: 'チャットルーム', to: '/rooms/' }
      const contact = { icon: mdiFaceAgent, title: '問い合わせ', to: '/contact' }
      const login = { icon: mdiLogin, title: 'ログイン', to: '/login' }
      const about = { icon: mdiInformation, title: '当サイトについて', to: '/about' }
      const signup = { icon: mdiAccountPlus, title: '新規登録', to: '/signup' }
      return loginUser.value
        ? [
            { id: 1, ...home },
            { id: 2, ...reportNew },
            { id: 3, ...database },
            { id: 4, ...users },
            // { id: 5, ...chatRoom },
            { id: 6, ...about },
            { id: 7, ...contact }
          ]
        : [
            { id: 1, ...home },
            { id: 2, ...login },
            { id: 3, ...signup },
            { id: 4, ...reportNew },
            { id: 5, ...database },
            { id: 6, ...users },
            // { id: 7, ...chatRoom },
            { id: 8, ...about },
            { id: 9, ...contact }
          ]
    })
    const isDrawer = ref(false)
    const showDrawer = (): void => {
      isDrawer.value = true
    }
    const hideDrawer = (): void => {
      isDrawer.value = false
    }

    const logout = (): void => {
      const auth = getAuth()
      signOut(auth)
        .then(() => {
          hideDrawer()
          router.push('/')
          openSnackbar('success', 'ログアウトしました。')
        })
        .catch(() => openSnackbar('failure', 'ログアウトに失敗しました。'))
    }

    const drawer = ref(false)
    const dialogTerms = ref(false)
    const dialogPrivacyPolicy = ref(false)
    const show = (type: 'drawer' | 'terms' | 'privacy policy'): void => {
      type === 'drawer'
        ? (drawer.value = true)
        : type === 'terms'
        ? (dialogTerms.value = true)
        : (dialogPrivacyPolicy.value = true)
    }
    const hide = (type: 'drawer' | 'terms' | 'privacy policy'): void => {
      type === 'drawer'
        ? (drawer.value = false)
        : type === 'terms'
        ? (dialogTerms.value = false)
        : (dialogPrivacyPolicy.value = false)
    }

    return {
      dialogPrivacyPolicy,
      dialogTerms,
      drawer,
      headerLogo,
      hide,
      isDrawer,
      lazy,
      loginUser,
      logout,
      mdiLogout,
      mdiMenu,
      navigationDrawerItems,
      noAvatarImage,
      pushToHome,
      show,
      showDrawer,
      snackbar
    }
  },

  head() {
    const headerLogo = require('@/assets/header_logo.png')
    return {
      link: [
        {
          rel: 'canonical',
          href: `https:/foot-repo.com${this.$route.path}`
        },
        {
          rel: 'preload',
          href: headerLogo,
          as: 'image'
        }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
.o-light-indigo {
  background: #{$light-indigo};
}
.o-font-10 {
  font-size: 10px;
}
</style>
