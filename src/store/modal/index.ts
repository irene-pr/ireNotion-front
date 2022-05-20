import state from "./state";
import mutations from "./mutations";
import actions from "./actions";

const modal = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export default modal;
