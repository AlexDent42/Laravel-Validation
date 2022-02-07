import config from '../config';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import router from '../Routes';

export default {
  namespaced: true,
  state: {
    isFetching: false,
    errorMessage: '',
    currentUser: null,
  },
  mutations: {
    LOGIN_FAILURE(state, payload) {
      state.isFetching = false;
      state.errorMessage = payload;
      state.currentUser = null;
    },
    LOGIN_SUCCESS(state, user) {
      state.isFetching = false;
      state.errorMessage = '';
      state.currentUser = user || null;
    },
    LOGIN_REQUEST(state) {
      state.isFetching = true;
    },
  },
  actions: {
    async findMe({ dispatch }) {
      try {
        const response = await axios.get('/auth/me');
        return response.data;
      } catch (e) {
        dispatch('logoutUser');
      }
    },
    async doInit({ dispatch, commit }) {
      try {
        let currentUser = null;
        let token = localStorage.getItem('token');
        if (token) {
          currentUser = await dispatch('findMe');
        }
        commit('LOGIN_SUCCESS', currentUser);
      } catch (e) {
        commit('LOGIN_FAILURE', e);
      }
    },
    async loginUser({ dispatch }, payload) {
      dispatch('requestLogin');
      if (payload.social) {
        window.location.href =
          config.baseURLApi + '/auth/signin/' + payload.social;
      } else if (payload.email && payload.password) {
        try {
          const res = await axios.post('/auth/signin/local', payload);
          const token = res.data;
          dispatch('receiveToken', token);
          dispatch('doInit');
        } catch (e) {
          this._vm.$toasted.show('Error: ' + e, {
            type: 'error',
          });
          dispatch('loginError', e.response.data);
        }
      } else {
        dispatch('loginError', 'Something was wrong. Try again');
      }
    },
    receiveToken({ commit }, token) {
      let user = jwt.decode(token);

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      commit('LOGIN_SUCCESS');
      router.push('/');
    },
    logoutUser() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      axios.defaults.headers.common['Authorization'] = '';
      router.push('/login');
    },
    loginError({ commit }, payload) {
      commit('LOGIN_FAILURE', payload);
    },
    requestLogin({ commit }) {
      commit('LOGIN_REQUEST');
    },
    receiveLogin({ commit }) {
      commit('LOGIN_SUCCESS');
    },
  },
};
