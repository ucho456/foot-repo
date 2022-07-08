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
      { hid: 'keywords', name: 'keywords', content: 'サッカー,選手採点' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'フットレポ' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://foot-repo.com' },
      { hid: 'og:title', property: 'og:title', content: 'フットレポ' },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'サッカーの選手採点共有サービスです。各国主要リーグやワールドカップ、日本代表などの試合の選手採点を投稿したり閲覧する事が出来ます。'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content:
          'https://firebasestorage.googleapis.com/v0/b/foot-repo.appspot.com/o/logo.png?alt=media&token=876c838d-843f-463b-a3b3-a86946c0e688'
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content:
          'https://firebasestorage.googleapis.com/v0/b/foot-repo.appspot.com/o/logo.png?alt=media&token=876c838d-843f-463b-a3b3-a86946c0e688'
      },
      { name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@foot_repo' }
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
    '@nuxtjs/pwa',
    '@nuxtjs/composition-api/module',
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/google-fonts',
    '@nuxtjs/vuetify'
  ],

  modules: ['@nuxtjs/axios', '@nuxtjs/sitemap'],

  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://foot-repo.com'
  },

  manifest: {
    name: 'フットレポ',
    lang: 'ja'
  },

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
    defaultAssets: {
      font: false,
      icons: 'mdiSvg'
    },
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

  googleFonts: {
    families: {
      Roboto: [500, 700],
      download: true,
      inject: true
    }
  },

  build: {
    transpile: ['vee-validate/dist/rules']
    // analyze: true
  }
}
