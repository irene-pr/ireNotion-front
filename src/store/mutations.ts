import { IState, IUserContent } from "@/types/interfaces";

const mutations = {
  setToken(state: IState, payload: string): void {
    state.token = payload;
  },

  setUserContent(state: IState, payload: IUserContent): void {
    state.userContent = payload;
  },
};

export default mutations;
