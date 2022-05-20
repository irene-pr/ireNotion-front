import state from "./state";
import mutations from "./mutations";
import actions from "./actions";

const theme = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export default theme;
