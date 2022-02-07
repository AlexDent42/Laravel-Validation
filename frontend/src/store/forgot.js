import config from '../config';
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    isFetching: false,
    errorMessage: '',
  },
  mutations: {
    startFetching(state) {
      state.isFetching = true;
    },
    finishFetching(state) {
      state.isFetching = false;
    },
    error(state, payload) {
      state.errorMessage = payload;
    },
  },
  actions: {
    async forgot({ commit }, payload) {
      try {
        commit('startFetching');
        await axios.post(
          config.baseURLApi + '/auth/send-password-reset-email',
          {
            email: payload,
          },
        );
        this._vm.$toasted.show('Check your email address', {
          type: 'success',
        });
        commit('error', '');
        commit('finishFetching');
      } catch (e) {
        this._vm.$toasted.show('Error: ' + e, {
          type: 'error',
        });
        commit('finishFetching');
      }
    },
  },
};
