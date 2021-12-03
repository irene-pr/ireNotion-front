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
};

export default mutations;
