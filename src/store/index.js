import Vue from 'vue'
import Vuex from 'vuex'
import alert from './alert.module'

Vue.use(Vuex)

const options = {
  state: {
    leftNavBarDrawer: false,
    loading: false,
  },
  mutations: {
    setLoading(state, loading) {
      Vue.set(state, 'loading', loading);
    },
    setLeftNavBarDrawer(state, drawer) {
      Vue.set(state, 'leftNavBarDrawer', drawer);
    },
  },
  actions: {
    setLoading({commit}, payload) {
      commit('setLoading', payload);
    },
  },
  getters: {
  },
  modules: {
    alert: alert
  },

};

export default new Vuex.Store(options);