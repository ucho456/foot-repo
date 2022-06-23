import colors from 'vuetify/es5/util/colors'

export default {
  head: {
    title: 'フットレポ',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'サッカーの選手採点共有サービスです。各国主要リーグやワールドカップ、日本代表などの試合の選手採点を投稿したり閲覧する事が出来ます。'
      },
      { hid: 'keywords', name: 'keywords', content: 'サッカー,選手採点' }
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/favicon_logo.png' }]
  },

  srcDir: 'src',

  css: [],

  plugins: [
    '@/plugins/firebase',
    '@/plugins/firebase-auth',
    '@/plugins/snackbar',
    '@/plugins/store',
    '@/plugins/vee-validate'
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
          alert: colors.yellow,
          failure: colors.pink
        }
      }
    }
  },

  build: { transpile: ['vee-validate/dist/rules'] }
}
