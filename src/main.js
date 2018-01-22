import Vue from 'vue'


import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'


Vue.use(Vuetify)



// Vue.use(VueSocketio, 'http://localhost:1337') // Automaticly socket connect from url string

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({

  el: '#app',
  router,

  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    customEmit: function (val) {
      console.log('this method fired by socket server. eg: io.emit("customEmit", data)')
    }
  },

  render: h => h(App)
})
