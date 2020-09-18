const pkg = require('./package')


const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

let devAPI = 'http://localhost:8000/api/v1/';
let prodAPI = 'http://be.en-xpress.com/api/v1/';
let development = process.env.NODE_ENV !== 'production';
let baseApiUrl = development ? devAPI : prodAPI;


module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Enxpress',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'description', name: 'description', content: 'Vue Material Admin Template is a \n' +
          '    Google Material Design inspired admin dashboard template built with Vue and Vuetify.'
      }
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ],
    script: [
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.0.4/echarts-en.min.js'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#e0290c'},

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/theme.styl',
    '~/assets/style/app.styl',
    'font-awesome/css/font-awesome.css',
    'roboto-fontface/css/roboto/roboto-fontface.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    '@/plugins/vee-validate',
    '@/plugins/axios',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    baseURL: baseApiUrl
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ["~assets/style/variables.styl"]
      }
    },

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  },

  env: {
    production: false,
    baseApiUrl: baseApiUrl,
    languages: ['en', 'nl'],
    feDateFormat: 'DD-MM-YYYY',
    beDateFormat: 'YYYY-MM-DD',
    accessTokenTimeOffset: 30,
  }
}
