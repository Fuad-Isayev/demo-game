import { createStore } from "vuex";

const state = {
  reset: null,
  user: null,
};

const store = createStore({
  state,
  getters: {
    user: (state) => {
      return state.user;
    },
    reset: (state) => {
      return state.reset;
    },
  },
  actions: {
    user(context, user) {
      context.commit("user", user);
    },
    reset(context, reset) {
      context.commit("reset", reset);
    },
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
    reset(state, reset) {
      state.reset = reset;
    },
  },
});

export default store;
