<template>
  <v-app class="light-gray">
    <v-app-bar class="white--text" app fixed color="darkBlue">
      <v-container class="d-flex align-center">
        <v-toolbar-title v-text="'Foot-Repo'" />
        <v-spacer />
        <v-btn class="white--text" icon @click.stop="toggleDrawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col md="9" sm="8"><nuxt /></v-col>
          <v-col md="3" sm="4"><SideContainer /></v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="showFlg" fixed right temporary>
      <v-list>
        <v-list-item v-for="item in items" :key="item.key" :to="item.to" exact router>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template #append>
        <div class="px-5">
          <div>底</div>
        </div>
      </template>
    </v-navigation-drawer>
    <v-footer class="white--text" :absolute="true" app color="darkGrey">
      <v-container class="d-flex align-center">
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'
import SideContainer from '@/components/organisms/SideContainer.vue'

export default defineComponent({
  name: 'Default',

  components: {
    SideContainer
  },

  setup() {
    const items = computed(() => {
      const items = [
        { key: 1, icon: 'mdi-home', title: 'ホーム', to: '/' },
        { key: 2, icon: 'mdi-pencil-plus', title: 'レポート作成', to: '/reports/search' },
        { key: 3, icon: 'mdi-login', title: 'ログイン', to: '/login' }
      ]
      return items
    })
    const showFlg = ref(false)
    const toggleDrawer = (): boolean => (showFlg.value = !showFlg.value)
    return { items, showFlg, toggleDrawer }
  }
})
</script>

<style lang="scss" scoped>
.light-gray {
  background: #eceff1;
}
</style>
