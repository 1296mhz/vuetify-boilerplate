import Vue from 'vue'

export const navbar = {
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
        getLeftNavBarDrawer: state => state.leftNavBarDrawer
    },
};