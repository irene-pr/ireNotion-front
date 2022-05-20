import { createStore } from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import state from "./state";
import getters from "./getters";
import theme from "./theme";
import user from "./user";
import modal from "./modal";

export default createStore({
  state,
  mutations,
  actions,
  getters,
  modules: { theme, user, modal },
});
