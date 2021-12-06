import { ActionContext } from "vuex";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {
  IBodyUpdateNameBoard,
  IBodyUpdateNote,
  IState,
  IUserLoginData,
  IUserRegisterData,
} from "@/types/interfaces";
import router from "@/router";
import paths from "@/router/paths";

const actions = {
  toggleTheme({ commit }: ActionContext<IState, IState>): void {
    commit("toggleTheme");
  },

  async loginUser(
    { commit }: ActionContext<IState, IState>,
    user: IUserLoginData
  ): Promise<void | string | number> {
    try {
      const response = await axios.post(
        `${process.env.VUE_APP_API}/user/login/`,
        user
      );
      if (response.status === 201) {
        localStorage.setItem("token", JSON.stringify(response.data));
        commit("setUserData", jwtDecode(response.data.token));
        return 200;
      }
      return response.status;
    } catch {
      return "Could not log in user";
    }
  },

  logoutUser({ commit }: ActionContext<IState, IState>): void {
    localStorage.removeItem("token");
    commit("setLogoutState");
  },

  async registerUser(
    { dispatch }: ActionContext<IState, IState>,
    user: IUserRegisterData
  ): Promise<void | string> {
    try {
      const response = await axios.post(
        `${process.env.VUE_APP_API}/user/register/`,
        user
      );
      if (response.status === 201) {
        router.push(paths.login);
      }
      return dispatch("logoutUser");
    } catch {
      return "Username already exists";
    }
  },

  async getUserContent({
    commit,
  }: ActionContext<IState, IState>): Promise<void | string> {
    try {
      const { token } = JSON.parse(localStorage.getItem("token") || "");
      const response = await axios.get(
        `${process.env.VUE_APP_API}/user/content/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 401) {
        commit("setLogoutState");
        router.push(paths.login);
      }
      return commit("setUserContent", response.data);
    } catch {
      return "Could not get user content";
    }
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

  async deleteNote(
    { dispatch }: ActionContext<IState, IState>,
    params: string
  ): Promise<string | void> {
    try {
      const { token } = JSON.parse(localStorage.getItem("token") || "");
      await axios.delete(`${process.env.VUE_APP_API}/note/delete/${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return dispatch("getUserContent");
    } catch {
      return "Note could not be deleted";
    }
  },

  async createBoard({
    dispatch,
  }: ActionContext<IState, IState>): Promise<string | void> {
    const body = { name: "New board" };
    try {
      const { token } = JSON.parse(localStorage.getItem("token") || "");
      await axios.post(`${process.env.VUE_APP_API}/boards/create`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return dispatch("getUserContent");
    } catch {
      return "Board could not be created";
    }
  },

  async deleteBoard(
    { dispatch }: ActionContext<IState, IState>,
    params: string
  ): Promise<string | void> {
    try {
      const { token } = JSON.parse(localStorage.getItem("token") || "");
      await axios.delete(`${process.env.VUE_APP_API}/boards/delete/${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return dispatch("getUserContent");
    } catch {
      return "Board could not be deleted";
    }
  },

  async updateNameBoard(
    { dispatch }: ActionContext<IState, IState>,
    body: IBodyUpdateNameBoard
  ): Promise<string | void> {
    try {
      const { token } = JSON.parse(localStorage.getItem("token") || "");
      await axios.put(`${process.env.VUE_APP_API}/boards/update`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return dispatch("getUserContent");
    } catch {
      return "Board could not be updated";
    }
  },

  async updateNote(
    { dispatch }: ActionContext<IState, IState>,
    body: IBodyUpdateNote
  ): Promise<string | void> {
    try {
      const { token } = JSON.parse(localStorage.getItem("token") || "");
      await axios.put(`${process.env.VUE_APP_API}/note/update`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return dispatch("getUserContent");
    } catch {
      return "Note could not be updated";
    }
  },
};

export default actions;
