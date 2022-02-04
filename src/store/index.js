import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";

Vue.use(Vuex);

const state = () => ({
  dataSource: [],
  isLoading: true,
  errors: [],
});

const actions = {
  loadData({ commit }) {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        commit("UPDATE_DATA", response.data);
        commit("UPDATE_LOADING_STATE", false);
      })
      .catch((error) => {
        commit("ADD_ERROR", "Ошибка получения данных с сервера");
        return error;
      });
  },
};

const getters = {
  getDataSource(state) {
    return state.dataSource;
  },
  getErrors(state) {
    return state.errors;
  },
};

const mutations = {
  UPDATE_DATA(state, payload) {
    state.dataSource = payload;
  },
  ADD_ERROR(state, error) {
    state.errors.push(error);
  },
  UPDATE_LOADING_STATE(state, status) {
    state.isLoading = status;
  },
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});
