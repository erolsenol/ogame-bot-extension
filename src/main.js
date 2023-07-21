import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labsComponents from 'vuetify/labs/components'


import helper from "./helper"

const vuetify = createVuetify({
    components,
    directives,
    components: {
        ...components,
        ...labsComponents,
      },
  })

const app = createApp(App)

app.provide('$helper', helper);

app.use(vuetify)

app.mount("#app")