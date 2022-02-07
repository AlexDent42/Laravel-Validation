import axios from 'axios';

export default {
  namespaced: true,
  state: {
    data: {},

    searchResultAuthor: [],

    searchResultCategory: [],

    searchResultTags: [],
  },
  mutations: {
    getData(state, payload) {
      state.data = payload;
    },

    setAuthor(state, payload) {
      state.searchResultAuthor = payload.map((item) => {
        return {
          value: item.id,
          label: item.label,
        };
      });
    },

    setCategory(state, payload) {
      state.searchResultCategory = payload.map((item) => {
        return {
          value: item.id,
          label: item.label,
        };
      });
    },

    setTags(state, payload) {
      state.searchResultTags = payload;
    },
  },
  actions: {
    async newHandler({ commit }, payload) {
      try {
        const result = await axios.post('/articles', { data: payload.data });
        this._vm.$toasted.show('Articles created', {
          type: 'success',
        });
        commit(`getData`, result.data);
      } catch (e) {
        this._vm.$toasted.show('Error: ' + e, {
          type: 'error',
        });
      }
    },
    async edit({ commit, dispatch }, payload) {
      try {
        const result = await axios.put(`/articles/${payload.id}`, {
          id: payload.id,
          data: payload.data,
        });

        this._vm.$toasted.show('Articles edit', {
          type: 'success',
        });
        commit(`getData`, result.data);
      } catch (e) {
        this._vm.$toasted.show('Error: ' + e, {
          type: 'error',
        });
      }
    },
    async getData({ commit }, payload) {
      try {
        const result = await axios.get(`/articles/${payload}`);
        commit(`getData`, result.data);
      } catch (e) {
        this._vm.$toasted.show('Error: ' + e, {
          type: 'error',
        });
      }
    },

    async searchAuthor({ commit }, val) {
      try {
        if (val) {
          const result = await axios(
            `/users/autocomplete?query=${val}&limit=100`,
          );
          commit('setAuthor', result.data);
        } else {
          const result = await axios(`/users/autocomplete?limit=100`);
          commit('setAuthor', result.data);
        }
      } catch (e) {
        this._vm.$toasted.show('Error: ' + e, {
          type: 'error',
        });
        commit('setAuthor', []);
      }
    },

    async searchCategory({ commit }, val) {
      try {
        if (val) {
          const result = await axios(
            `/categories/autocomplete?query=${val}&limit=100`,
          );
          commit('setCategory', result.data);
        } else {
          const result = await axios(`/categories/autocomplete?limit=100`);
          commit('setCategory', result.data);
        }
      } catch (e) {
        this._vm.$toasted.show('Error: ' + e, {
          type: 'error',
        });
        commit('setCategory', []);
      }
    },

    async searchTags({ commit }, val) {
      try {
        if (val) {
          const result = await axios(
            `/tags/autocomplete?query=${val}&limit=100`,
          );
          commit('setTags', result.data);
        } else {
          const result = await axios(`/tags/autocomplete?limit=100`);
          commit('setTags', result.data);
        }
      } catch (e) {
        this._vm.$toasted.show('Error: ' + e, {
          type: 'error',
        });
        commit('setTags', []);
      }
    },
  },
};
