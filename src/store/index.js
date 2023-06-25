import Vue from 'vue'
import Vuex from 'vuex'
import {alert} from './alert.module'
import {loading} from './loading.module'
import {navbar} from './navbar.module'
import {authentication} from './authentication.module'

Vue.use(Vuex)

const options = {
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  modules: {
    alert,
    loading,
    navbar,
    authentication
  },
};

export default new Vuex.Store(options);