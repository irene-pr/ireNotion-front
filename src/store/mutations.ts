import { IState, IUserContent, IUserData } from "@/types/interfaces";

const mutations = {
  setUserContent(state: IState, payload: IUserContent): void {
    state.userContent = payload;
  },

  setUserData(state: IState, payload: IUserData): void {
    state.userData = payload;
  },

  setIsLoggedIn(state: IState, payload: boolean): void {
    state.isLoggedIn = payload;
  },

  setLogoutState(state: IState): void {
    state.isLoggedIn = false;
    state.userContent = {
      name: "",
      boards: [],
    };
    state.userData = {
      userId: "",
      username: "",
    };
  },

  toggleTheme(state: IState): void {
    state.themeHeaders =
      state.themeHeaders === "day-mode" ? "night-mode" : "day-mode";
    state.themeSurfaces =
      state.themeSurfaces === "day-mode" ? "night-mode" : "day-mode";
  },
};

export default mutations;
