import { IState } from "@/types/interfaces";

const mutations = {
  setToken(state: IState, payload: string): void {
    state.token = payload;
  },
};

export default mutations;
