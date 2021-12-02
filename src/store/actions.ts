import { ActionContext } from "vuex";
import axios from "axios";
import { IState, IUserLoginData } from "@/types/interfaces";

const actions = {
  async loginUser(
    { commit }: ActionContext<IState, IState>,
    user: IUserLoginData
  ): Promise<void> {
    const { data: token } = await axios.post(
      `${process.env.VUE_APP_API}/user/login/`,
      user
    );
    localStorage.setItem("token", JSON.stringify(token));
    commit("setToken", token);
  },

  async getUserContent({
    commit,
  }: ActionContext<IState, IState>): Promise<void> {
    const { token } = JSON.parse(localStorage.getItem("token") || "");

    const { data: userContent } = await axios.get(
      `${process.env.VUE_APP_API}/user/content/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    commit("setUserContent", userContent);
  },
};

export default actions;
