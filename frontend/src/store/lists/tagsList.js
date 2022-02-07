import axios from 'axios';

export default {
  namespaced: true,
  state: {
    loading: true,
    rows: {},
    modalOpen: false,
    deleteId: '',
  },
  mutations: {
    getData(state, payload) {
      state.rows = [];
      state.rows = payload;
    },
    showLoader(state) {
      state.loading = true;
    },
    hideLoader(state) {
      state.loading = false;
    },
    setDeleteId(state, payload) {
      state.deleteId = payload;
    },
  },
  actions: {
    async getFilteredData({ commit }, request) {
      try {
        commit('showLoader');
        const response = await axios.get(`/tags${request}`);
        commit('getData', response.data.rows);
        commit('hideLoader');
      } catch (e) {
        this._vm.$toasted.show('Error: ' + e, {
          type: 'error',
        });
      }
    },
    async getData({ commit }) {
      try {
        commit('showLoader');
        const response = await axios.get(`/tags`);
        commit('getData', response.data.rows);
        commit('hideLoader');
      } catch (e) {
        this._vm.$toasted.show('Error: ' + e, {
          type: 'error',
        });
      }
    },

    async deleteItem({ dispatch, state }) {
      try {
        await axios.delete(`/tags/${state.deleteId}`);
        this._vm.$toasted.show('Tags delete', {
          type: 'success',
        });
        dispatch('getData');
      } catch (e) {
        this._vm.$toasted.show('Error: ' + e, {
          type: 'error',
        });
      }
    },
  },
};
