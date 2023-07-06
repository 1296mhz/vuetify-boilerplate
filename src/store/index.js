import Vue from 'vue'
import Vuex from 'vuex'
import {alert} from './alert.module'
import {loading} from './loading.module'
import {navbar} from './navbar.module'
import {authentication} from './authentication.module'
import {profile} from './profile.module'

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
    authentication,
    profile
  },
};

export default new Vuex.Store(options);