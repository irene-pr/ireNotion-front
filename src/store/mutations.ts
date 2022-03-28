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
      if (board.id === idBoard) {
        for (let i = 0; i < board.notes.length; i++) {
          if (board.notes[i].id === idNote) {
            board.notes.splice(i, 1);
            break;
          }
        }
      }
    });
  },

  removeBoardFromContent(state: IState, payload: string): void {
    const [idBoard, idNote] = payload.split("/");
    state.userContent.boards.forEach((board) => {
      if (board.id === idBoard) {
        for (let i = 0; i < board.notes.length; i++) {
          if (board.notes[i].id === idNote) {
            board.notes.splice(i, 1);
            break;
          }
        }
      }
    });
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
