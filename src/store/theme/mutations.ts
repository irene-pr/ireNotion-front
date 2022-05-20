import { IThemeState } from "@/types/store";

const mutations = {
  toggleTheme(state: IThemeState): void {
    state.themeHeaders =
      state.themeHeaders === "day-mode" ? "night-mode" : "day-mode";
    state.themeSurfaces =
      state.themeSurfaces === "day-mode" ? "night-mode" : "day-mode";
  },
};

export default mutations;
