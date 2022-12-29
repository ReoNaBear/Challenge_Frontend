import { createStore } from "vuex";
import usersAPI from "./../apis/users";

const state = {
  currentUser: {
    userId: -1,
    userName: "",
    userEmail: "",
    isAdmin: "",
    empNo: "",
    isBanned: "",
  },
  isAuthenticated: false,
  token: "",
};

const getters = {};
const mutations = {
  setCurrentUser(state, currentUser) {
    state.currentUser = {
      ...state.currentUser,
      ...currentUser,
    };
    state.isAuthenticated = true;
    state.token = localStorage.getItem("token");
  },
  revokeAuthentication(state) {
    state.currentUser = {};
    state.isAuthenticated = false;
    state.token = "";
    localStorage.removeItem("token");
  },
};
const actions = {
  async fetchCurrentUser({ commit }) {
    try {
      const { data } = await usersAPI.getCurrentUser();
      const { userId, userName, userEmail, isAdmin, empNo } = data.data;
      commit("setCurrentUser", {
        userId,
        userName,
        userEmail,
        isAdmin,
        empNo,
      });
      return data.data.isAdmin;
    } catch (error) {
      console.log("error", error);
      console.error(error.message);
      commit("revokeAuthentication");
      return false;
    }
  },
};
const modules = {};

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules,
});
