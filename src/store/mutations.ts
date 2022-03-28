import { IState, IUserContent, IUserData } from "@/types/interfaces";

const mutations = {
  setIsLoading(state: IState, payload: boolean): void {
    state.isLoading = payload;
  },

  setUserContent(state: IState, payload: IUserContent): void {
    state.userContent = payload;
  },

  removeNoteFromContent(state: IState, payload: string): void {
    const [idBoard, idNote] = payload.split("/");
    state.userContent.boards.forEach((board) => {
      board.notes =
        board.id === idBoard
          ? board.notes.filter((note) => note.id !== idNote)
          : board.notes;
    });
  },

  removeBoardFromContent(state: IState, payload: string): void {
    state.userContent.boards = state.userContent.boards.filter(
      (board) => board.id !== payload
    );
  },

  setUserData(state: IState, payload: IUserData): void {
    state.userData = payload;
  },

  setIsLoggedIn(state: IState, payload: boolean): void {
    state.isLoggedIn = payload;
  },

  setLogoutState(state: IState): void {
    state.isLoggedIn = false;
    state.userContent = {
      name: "",
      boards: [],
    };
    state.userData = {
      userId: "",
      username: "",
    };
  },

  toggleTheme(state: IState): void {
    state.themeHeaders =
      state.themeHeaders === "day-mode" ? "night-mode" : "day-mode";
    state.themeSurfaces =
      state.themeSurfaces === "day-mode" ? "night-mode" : "day-mode";
  },

  setIsBoardEditModal(state: IState, payload: boolean): void {
    state.isBoardEditModal = payload;
  },

  setIsUpdateNoteModal(state: IState, payload: boolean): void {
    state.isUpdateNoteModal = payload;
  },

  setIdForModal(state: IState, payload: string): void {
    state.idForModal = payload;
  },
};

export default mutations;
