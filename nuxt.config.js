import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - foot-repo',
    title: 'foot-repo',
    htmlAttrs: {
      lang: 'en'
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

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/firebase', '@/plugins/firebase-auth', '@/plugins/vee-validate'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/composition-api/module',
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
    // [
    //   '@nuxtjs/firebase',
    //   {
    //     config: {
    //       apiKey: process.env.FIREBASE_API_KEY,
    //       authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    //       projectId: process.env.FIREBASE_PROJECT_ID,
    //       storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    //       messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    //       appId: process.env.FIREBASE_APP_ID,
    //       measurementId: process.env.FIREBASE_MEASUREMENT_ID
    //     },
    //     services: {
    //       // auth: true,
    //       firestore: true
    //       // functions: true,
    //       // storage: true,
    //       // performance: true,
    //       // analytics: true
    //     }
    //   }
    // ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
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

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
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

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: { transpile: ['vee-validate/dist/rules'] }
}
