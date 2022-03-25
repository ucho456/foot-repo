import colors from 'vuetify/es5/util/colors'

export default {
  head: {
    titleTemplate: '%s - foot-repo',
    title: 'foot-repo',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  srcDir: 'src',

  css: [],

  plugins: [
    '@/plugins/firebase',
    '@/plugins/firebase-auth',
    '@/plugins/vee-validate',
    '@/plugins/snackbar'
  ],

  components: true,

  buildModules: [
    '@nuxtjs/composition-api/module',
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify'
  ],

  modules: ['@nuxtjs/axios'],

  axios: {
    proxy: true
  },

  publicRuntimeConfig: {
    footballUrl: process.env.FOOTBALL_URL,
    footballToken: process.env.NODE_ENV !== 'production' ? process.env.FOOTBALL_TOKEN : undefined
  },

  privateRuntimeConfig: {
    footballToken: process.env.FOOTBALL_TOKEN
  },

  vuetify: {
    customVariables: ['@/assets/variables.scss'],
    treeShake: true,
    theme: {
      themes: {
        light: {
          primary: colors.indigo.darken4,
          accent: colors.indigo.accent4,
          fotter: colors.blueGrey.darken4,
          success: colors.green,
          failure: colors.pink
        }
      }
    }
  },

  build: { transpile: ['vee-validate/dist/rules'] }
}
