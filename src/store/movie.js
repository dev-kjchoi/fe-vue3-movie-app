import axios from "axios";
import _uniqBy from "lodash/uniqBy";

const _defaultMessage = "Search for the movie title!";

export default {
  // module - 모듈화 여부
  namespaced: true,

  // data - 취급해야 하는 데이터
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {},
  }),

  // computed - state를 활용하여 계산된 state를 만들어냄
  getters: {},

  // methods - mutations에서만 state의 값을 수정 할 수 있음
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
    resetMovies(state) {
      state.movies = [];
      state.message = _defaultMessage;
      state.loading = false;
    },
  },

  // methods - 비동기 처리 됨
  actions: {
    async searchMovies({ state, commit }, payload) {
      if (state.loading) return;

      commit("updateState", {
        message: "",
        loading: true,
      });

      try {
        const res = await _fetchMovie({
          ...payload,
          page: 1,
        });
        const { Search, totalResults } = res.data;
        commit("updateState", {
          movies: _uniqBy(Search, "imdbID"),
        });

        const total = parseInt(totalResults, 10);
        const pageLength = Math.ceil(total / 10);

        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page += 1) {
            if (page > payload.number / 10) break;
            const res = await _fetchMovie({
              ...payload,
              page,
            });
            const { Search } = res.data;
            commit("updateState", {
              movies: [...state.movies, ..._uniqBy(Search, "imdbID")],
            });
          }
        }
      } catch ({ message }) {
        commit("updateState", {
          movies: [],
          message,
        });
      } finally {
        commit("updateState", {
          loading: false,
        });
      }
    },
    async searchMovieWithId({ state, commit }, payload) {
      if (state.loading) return;

      commit("updateState", {
        theMovie: {},
        loading: true,
      });

      try {
        const res = await _fetchMovie(payload);
        commit("updateState", {
          theMovie: res.data,
        });
      } catch (error) {
        commit("updateState", {
          theMovie: {},
        });
      } finally {
        commit("updateState", {
          loading: false,
        });
      }
    },
  },
};

async function _fetchMovie(payload) {
  return await axios.post("/.netlify/functions/movie", payload);
}
