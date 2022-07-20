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
          'サッカーの選手採点共有サービスです。ヨーロッパの主要リーグやワールドカップ、日本代表などの試合の選手採点を投稿したり閲覧する事が出来ます。'
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
          'サッカーの選手採点共有サービスです。ヨーロッパの主要リーグやワールドカップ、日本代表などの試合の選手採点を投稿したり閲覧する事が出来ます。'
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
    '@nuxtjs/vuetify',
    'nuxt-webfontloader',
    'nuxt-compress',
    'nuxt-delay-hydration'
  ],

  delayHydration: {
    mode: 'init'
  },

  modules: [
    [
      'nuxt-compress',
      {
        gzip: {
          cache: true
        },
        brotli: {
          threshold: 8192
        }
      }
    ]
  ],

  manifest: {
    name: 'フットレポ',
    lang: 'ja',
    short_name: 'フットレポ',
    title: 'フットレポ',
    'og:title': 'フットレポ',
    description:
      'サッカーの選手採点共有サービスです。ヨーロッパの主要リーグやワールドカップ、日本代表などの試合の選手採点を投稿したり閲覧する事が出来ます。',
    'og:description':
      'サッカーの選手採点共有サービスです。ヨーロッパの主要リーグやワールドカップ、日本代表などの試合の選手採点を投稿したり閲覧する事が出来ます。',
    theme_color: '#1a237e',
    background_color: '#1a237e'
  },

  vuetify: {
    customVariables: ['@/assets/variables.scss'],
    defaultAssets: {
      font: false,
      icons: 'mdiSvg'
    },
    treeShake: true
  },

  webfontloader: {
    custom: {
      families: ['Roboto:n3,n4,n5,n7'],
      urls: ['https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap']
    }
  },

  build: {
    transpile: ['vee-validate/dist/rules']
    // analyze: true
  }
}
