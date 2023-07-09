import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './_helpers/router';
import store from './store/index';
import { configureFakeBackend } from './_helpers';
import VueLogger from 'vuejs-logger';
const isProduction = process.env.NODE_ENV === 'production';
 
const loggerOptions = {
    isEnabled: true,
    logLevel : isProduction ? 'error' : 'debug',
    stringifyArguments : false,
    showLogLevel : true,
    showMethodName : true,
    separator: '|',
    showConsoleColors: true
};
 
Vue.use(VueLogger, loggerOptions);
const vueAppFakeApi = process.env.VUE_APP_FAKE_API?.toLowerCase()?.trim();

if (vueAppFakeApi === "true") {
  configureFakeBackend();
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
