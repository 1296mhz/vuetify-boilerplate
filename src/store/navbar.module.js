export default {
    namespaced: true,
    state: {
        leftNavBarDrawer: false,
    },
    mutations: {
        setLeftNavBarDrawer(state, drawer) {
            Vue.set(state, 'leftNavBarDrawer', drawer);
          },
    },
    actions: {

    },
    getters: {

    },
  };