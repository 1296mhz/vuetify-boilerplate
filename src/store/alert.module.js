import Vue from 'vue'

export const alert = {
    namespaced: true,
    state: {
        errorBar: false,
        errors: [],
        snackbarMessages: [],
    },
    mutations: {
        setError(state, error = '') {
            Vue.set(state, 'errors', [...state.errors, error]);
        },
        setErrorBar(state, error = false) {
            Vue.set(state, 'errorBar', error);
        },
        setMessage(state, message) {
            Vue.set(state, 'snackbarMessages', [...state.snackbarMessages, message]);
        },
    },
    actions: {
        message({ commit }, payload) {
            commit('setMessage', payload);
        },
        error({ commit }, payload) {
            commit('setError', payload);
            commit('setErrorBar', payload);
        },
        errorBar({ commit }, payload) {
            commit('setErrorBar', payload);
        },
    },
    getters: {
        lastError: state => state.errors.length > 0 ? state.errors[state.errors.length - 1] : '',
        errorsCount: state => state.errors.length,
        lastMessage: state =>  state.snackbarMessages.length > 0 ? state.snackbarMessages[state.snackbarMessages.length - 1] : '',
        messagesCount: state => state.snackbarMessages.length,
        getErrorBar: state => state.errorBar,
    },
};

// export default {
//   namespaced: true,
//   state: {
//       errors: [],
//       snackbarMessages: [],
//   },
//   mutations: {
//       setError(state, error = '') {
//           Vue.set(state, 'errors', [...state.errors, error]);
//       },
//       setMessage(state, message) {
//           Vue.set(state, 'snackbarMessages', [...state.snackbarMessages, message]);
//       },
//   },
//   actions: {
//       setMessage({ commit }, payload) {
//           commit('setMessage', payload);
//       },
//       setError({ commit }, payload) {
//           commit('setError', payload);
//       },
//   },
//   getters: {
//       lastError: state => state.errors.length > 0 ? state.errors[state.errors.length - 1] : '',
//       errorsCount: state => state.errors.length,
//       lastMessage: state =>  state.snackbarMessages.length > 0 ? state.snackbarMessages[state.snackbarMessages.length - 1] : '',
//       messagesCount: state => state.snackbarMessages.length,
//   },
// };