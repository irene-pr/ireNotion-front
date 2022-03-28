import { ActionContext } from "vuex";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {
  IBodyEditNameBoard,
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
    commit("setIsLoading", true);
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

      return commit("setIsLoading", false);
    } catch {
      commit("setIsLoading", false);
      return "Could not log in user";
    }
  },

  logoutUser({ commit }: ActionContext<IState, IState>): void {
    localStorage.removeItem("token");
    commit("setLogoutState");
  },

  async registerUser(
    { dispatch, commit }: ActionContext<IState, IState>,
    user: IUserRegisterData
  ): Promise<void | string> {
    commit("setIsLoading", true);
    try {
      const response = await axios.post(
        `${process.env.VUE_APP_API}/user/register/`,
        user
      );
      if (response.status === 201) {
        router.push(paths.login);
      }
      dispatch("logoutUser");
      return commit("setIsLoading", false);
    } catch {
      commit("setIsLoading", false);
      return "Username already exists";
    }
  },

  async getUserContent({
    commit,
  }: ActionContext<IState, IState>): Promise<void | string> {
    commit("setIsLoading", true);
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
      commit("setUserContent", response.data);
      return commit("setIsLoading", false);
    } catch {
      commit("setIsLoading", false);
      return "Could not get user content";
    }
  },

  checkToken({ commit }: ActionContext<IState, IState>): string | void {
    try {
      const token = JSON.parse(localStorage.getItem("token") || "");
      commit("setUserData", jwtDecode(token.token));
      return commit("setIsLoggedIn", true);
    } catch {
      return "User not logged in";
    }
  },

  async createParagraphNote(
    { dispatch, commit }: ActionContext<IState, IState>,
    idBoard: string
  ): Promise<string | void> {
    commit("setIsLoading", true);
    const randomNumber = Math.floor(Math.random() * 5);
    const colors = ["yellow", "pink", "blue", "orange", "green"];
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
      dispatch("getUserContent");
      return commit("setIsLoading", false);
    } catch {
      commit("setIsLoading", false);
      return "Paragraph note could not be created";
    }
  },

  async createListNote(
    { dispatch, commit }: ActionContext<IState, IState>,
    idBoard: string
  ): Promise<string | void> {
    commit("setIsLoading", true);
    const randomNumber = Math.floor(Math.random() * 5);
    const colors = ["yellow", "pink", "blue", "orange", "green"];
    const initialListCard = {
      type: "list",
      title: "List",
      color: colors[randomNumber],
      list: ["element 1", "element 2"],
    };
    const body = {
      note: initialListCard,
      idBoard,
    };

    try {
      const { token } = JSON.parse(localStorage.getItem("token") || "");
      await axios.post(`${process.env.VUE_APP_API}/note/create/`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch("getUserContent");
      return commit("setIsLoading", false);
    } catch {
      commit("setIsLoading", false);
      return "List note could not be created";
    }
  },

  async createChecklistNote(
    { dispatch, commit }: ActionContext<IState, IState>,
    idBoard: string
  ): Promise<string | void> {
    commit("setIsLoading", true);
    const randomNumber = Math.floor(Math.random() * 5);
    const colors = ["yellow", "pink", "blue", "orange", "green"];
    const initialChecklistCard = {
      type: "checklist",
      title: "Tasks",
      color: colors[randomNumber],
      list: [
        { checked: true, sentence: "laundry" },
        { checked: false, sentence: "feed cat" },
      ],
    };
    const body = {
      note: initialChecklistCard,
      idBoard,
    };

    try {
      const { token } = JSON.parse(localStorage.getItem("token") || "");
      await axios.post(`${process.env.VUE_APP_API}/note/create/`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch("getUserContent");
      return commit("setIsLoading", false);
    } catch {
      commit("setIsLoading", false);
      return "Checklist note could not be created";
    }
  },

  async deleteNote(
    { commit }: ActionContext<IState, IState>,
    params: string
  ): Promise<string | void> {
    try {
      commit("removeNoteFromContent", params);
      const { token } = JSON.parse(localStorage.getItem("token") || "");
      return await axios.delete(
        `${process.env.VUE_APP_API}/note/delete/${params}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch {
      commit("setIsLoading", false);
      return "Note could not be deleted";
    }
  },

  async createBoard({
    dispatch,
    commit,
  }: ActionContext<IState, IState>): Promise<string | void> {
    commit("setIsLoading", true);
    const body = { name: "New board" };
    try {
      const { token } = JSON.parse(localStorage.getItem("token") || "");
      await axios.post(`${process.env.VUE_APP_API}/boards/create`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch("getUserContent");
      return commit("setIsLoading", false);
    } catch {
      commit("setIsLoading", false);
      return "Board could not be created";
    }
  },

  async deleteBoard(
    { dispatch, commit }: ActionContext<IState, IState>,
    params: string
  ): Promise<string | void> {
    commit("setIsLoading", true);
    try {
      const { token } = JSON.parse(localStorage.getItem("token") || "");
      await axios.delete(`${process.env.VUE_APP_API}/boards/delete/${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch("getUserContent");
      return commit("setIsLoading", false);
    } catch {
      commit("setIsLoading", false);
      return "Board could not be deleted";
    }
  },

  async editNameBoard(
    { dispatch, commit }: ActionContext<IState, IState>,
    body: IBodyEditNameBoard
  ): Promise<string | void> {
    commit("setIsLoading", true);
    try {
      const { token } = JSON.parse(localStorage.getItem("token") || "");
      await axios.put(`${process.env.VUE_APP_API}/boards/update`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch("getUserContent");
      return commit("setIsLoading", false);
    } catch {
      commit("setIsLoading", false);
      return "Board could not be updated";
    }
  },

  async updateNote(
    { dispatch, commit }: ActionContext<IState, IState>,
    body: IBodyUpdateNote
  ): Promise<string | void> {
    commit("setIsLoading", true);
    try {
      const { token } = JSON.parse(localStorage.getItem("token") || "");
      await axios.put(`${process.env.VUE_APP_API}/note/update`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch("getUserContent");
      return commit("setIsLoading", false);
    } catch {
      commit("setIsLoading", false);
      return "Note could not be updated";
    }
  },

  setBoardEditModal(
    { commit }: ActionContext<IState, IState>,
    bool: boolean
  ): void {
    commit("setIsBoardEditModal", bool);
  },

  setUpdateNoteModal(
    { commit }: ActionContext<IState, IState>,
    bool: boolean
  ): void {
    commit("setIsUpdateNoteModal", bool);
  },

  setIdForModal({ commit }: ActionContext<IState, IState>, id: string): void {
    commit("setIdForModal", id);
  },
};

export default actions;
