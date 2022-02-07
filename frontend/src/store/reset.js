import config from '../config';
import axios from 'axios';
import router from '../Routes';

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
    async reset({ commit }, payload) {
      try {
        commit('startFetching');
        await axios.put(config.baseURLApi + '/auth/password-reset', {
          password: payload.password,
          token: payload.token,
        });
        this._vm.$toasted.show('Password has benn updated', {
          type: 'success',
        });
        router.push('/login');
        commit('error', '');
        commit('finishFetching');
      } catch (e) {
        commit('error', e);
        commit('finishFetching');
      }
    },
  },
};
