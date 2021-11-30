import { ActionContext } from "vuex";
import axios from "axios";
import { State, UserLoginData } from "@/types/interfaces";

const actions = {
  async loginUser(
    { commit }: ActionContext<State, State>,
    user: UserLoginData
  ): Promise<void> {
    const { data: token } = await axios.post(
      `${process.env.VUE_APP_API}/user/login/`,
      user
    );
    localStorage.setItem("token", JSON.stringify(token));
    commit("setToken", token);
  },
};

export default actions;
