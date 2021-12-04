import { ActionContext } from "vuex";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { IState, IUserLoginData } from "@/types/interfaces";
import router from "@/router";
import paths from "@/router/paths";

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
    commit("setUserData", jwtDecode(token.token));
  },

  async getUserContent({
    commit,
  }: ActionContext<IState, IState>): Promise<void> {
    const response = JSON.parse(localStorage.getItem("token") || "");
    const { data: userContent } = await axios.get(
      `${process.env.VUE_APP_API}/user/content/`,
      {
        headers: { Authorization: `Bearer ${response.token}` },
      }
    );
    if (response.status === 401) {
      router.push(paths.login);
    }
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

  async createParagraphNote(
    { dispatch }: ActionContext<IState, IState>,
    idBoard: string
  ): Promise<string | void> {
    const randomNumber = Math.floor(Math.random() * 4);
    const colors = ["yellow", "pink", "blue", "orange"];
    const initialParagraphCard = {
      type: "paragraph",
      title: "Title",
      paragraph: "This is a note. You can write whatever you want",
      color: colors[randomNumber],
    };
    const body = {
      note: initialParagraphCard,
      idBoard,
    };

    try {
      const { token } = JSON.parse(localStorage.getItem("token") || "");
      await axios.post(`${process.env.VUE_APP_API}/note/create/`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return dispatch("getUserContent");
    } catch {
      return "Paragraph note could not be created";
    }
  },
};

export default actions;
