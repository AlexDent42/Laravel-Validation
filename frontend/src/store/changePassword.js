import config from '../config';
import axios from 'axios';
import router from '../Routes';

export default {
  namespaced: true,
  state: {
    loading: false,
  },
  mutations: {
    startSubmit(state) {
      state.loading = true;
    },
    finishSubmit(state) {
      state.loading = false;
    },
  },
  actions: {
    async changePassword({ commit }, payload) {
      if (!payload) return false;
      try {
        commit('startSubmit');
        await axios.put(config.baseURLApi + '/auth/password-update', payload);
        this._vm.$toasted.show('Password has been changed', {
          type: 'success',
        });
        commit('finishSubmit');
        router.push('/app');
      } catch (e) {
        this._vm.$toasted.show('Error: ' + e, {
          type: 'error',
        });
        commit('finishSubmit');
      }
    },
  },
};
