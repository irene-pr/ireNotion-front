import { ActionContext } from "vuex";
import axios from "axios";
import jwtDecode from "jwt-decode";
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

  async checkToken({
    commit,
  }: ActionContext<IState, IState>): Promise<string | void> {
    try {
      const token = JSON.parse(localStorage.getItem("token") || "");
      commit("setUserData", jwtDecode(token.token));
      return commit("setIsLoggedIn", true);
    } catch {
      return "User not logged in";
    }
  },
};

export default actions;
