import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './_helpers/router';
import store from './store/index';

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
