import { State } from "@/types/interfaces";

const mutations = {
  setToken(state: State, payload: string): void {
    state.token = payload;
  },
};

export default mutations;
