import { createStore } from "vuex";
import usersAPI from "./../apis/users";
import { useQuasar } from "quasar";
const $q = useQuasar();

const state = {
  currentUser: {
    userId: -1,
    userName: "",
    userEmail: "",
    isAdmin: "",
    empNo: "",
    isBanned: "",
  },
  currentPunchData: {
    workTime: "",
    offWorkTime: "",
    duration: 0,
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
  setCurrentPunchData(state, currentPunchData) {
    state.currentPunchData = {
      ...state.currentPunchData,
      ...currentPunchData,
    };
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
      $q.notify({
        progress: true,
        position: "top",
        type: "negative",
        message: `${error.response.data.message}`,
        timeout: 1000,
      });
      commit("revokeAuthentication");
      return false;
    }
  },
  async fetchCurrentPunchData({ commit }) {
    try {
      const { data } = await usersAPI.getCurrentPunchData();
      console.log(data);
      const { workTime, offWorkTime, duration } = data.data;
      commit("setCurrentPunchData", {
        workTime,
        offWorkTime,
        duration,
      });
      return true;
    } catch (error) {
      $q.notify({
        progress: true,
        position: "top",
        type: "negative",
        message: `${error.response.data.message}`,
        timeout: 1000,
      });
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
