import { createStore } from "vuex";
import actions from "./actions";

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
  mutations: {},
  actions,
  modules: {},
});
