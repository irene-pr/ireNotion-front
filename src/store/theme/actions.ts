import { ActionContext } from "vuex";
import { IThemeState } from "@/types/store";

const actions = {
  toggleTheme({ commit }: ActionContext<IThemeState, IThemeState>): void {
    commit("toggleTheme");
  },
};

export default actions;
