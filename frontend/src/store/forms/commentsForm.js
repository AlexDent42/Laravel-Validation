import axios from 'axios';

export default {
  namespaced: true,
  state: {
    data: {},

    searchResultAuthor: [],

    searchResultArticle: [],
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

    setArticle(state, payload) {
      state.searchResultArticle = payload.map((item) => {
        return {
          value: item.id,
          label: item.label,
        };
      });
    },
  },
  actions: {
    async newHandler({ commit }, payload) {
      try {
        const result = await axios.post('/comments', { data: payload.data });
        this._vm.$toasted.show('Comments created', {
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
        const result = await axios.put(`/comments/${payload.id}`, {
          id: payload.id,
          data: payload.data,
        });

        this._vm.$toasted.show('Comments edit', {
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
        const result = await axios.get(`/comments/${payload}`);
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

    async searchArticle({ commit }, val) {
      try {
        if (val) {
          const result = await axios(
            `/articles/autocomplete?query=${val}&limit=100`,
          );
          commit('setArticle', result.data);
        } else {
          const result = await axios(`/articles/autocomplete?limit=100`);
          commit('setArticle', result.data);
        }
      } catch (e) {
        this._vm.$toasted.show('Error: ' + e, {
          type: 'error',
        });
        commit('setArticle', []);
      }
    },
  },
};
