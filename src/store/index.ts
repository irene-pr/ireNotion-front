import { createStore } from "vuex";
import actions from "./actions";
import mutations from "./mutations";

export default createStore({
  state: {
    isLoggedIn: false,
    userContent: {
      name: "",
      boards: [],
    },
    userId: "",
    token: "",
  },
  mutations,
  actions,
  getters: {},
  modules: {},
});
