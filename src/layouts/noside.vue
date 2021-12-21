<template>
  <v-app class="light-gray">
    <v-app-bar class="white--text" app color="darkBlue" fixed>
      <v-container class="align-center d-flex">
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
          <nuxt />
        </v-row>
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="showFlg" fixed right temporary>
      <v-list>
        <v-list-item
          v-for="item in navigationDrawerItems"
          :key="item.key"
          :to="item.to"
          exact
          router
        >
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
      <v-container class="align-center d-flex">
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { navigationDrawerItems } from '@/utils/navigationDrawerItems'

export default defineComponent({
  name: 'Noside',

  setup() {
    const showFlg = ref(false)
    const toggleDrawer = () => (showFlg.value = !showFlg.value)
    return { navigationDrawerItems, showFlg, toggleDrawer }
  }
})
</script>

<style lang="scss" scoped>
.light-gray {
  background: #eceff1;
}
</style>
