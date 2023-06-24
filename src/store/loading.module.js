export const loading = {
    namespaced: true,
    state: {
        loading: false,
    },
    mutations: {
        setLoading(state, loading) {
            Vue.set(state, 'loading', loading);
        },
    },
    actions: {
        setLoading({ commit }, payload) {
            commit('setLoading', payload);
        },
    },
    getters: {

    },
};