import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './_helpers/router';
import store from './store/index';
import { configureFakeBackend } from './_helpers';

const vueAppFakeApi = process.env.VUE_APP_FAKE_API?.toLowerCase()?.trim();

if (vueAppFakeApi === "true") {
  console.log("Запускаем")
}

if (vueAppFakeApi) {
  configureFakeBackend();
}


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
