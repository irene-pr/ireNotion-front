import {
  IBoard,
  INote,
  IUserContent,
  IUserData,
  IUserState,
} from "@/types/store";

const mutations = {
  setIsLoading(state: IUserState, payload: boolean): void {
    state.isLoading = payload;
  },

  setUserContent(state: IUserState, payload: IUserContent): void {
    state.userContent = payload;
  },

  removeNoteFromContent(state: IUserState, payload: string): void {
    const [idBoard, idNote] = payload.split("/");
    state.userContent.boards.forEach((board) => {
      board.notes =
        board.id === idBoard
          ? board.notes.filter((note) => note.id !== idNote)
          : board.notes;
    });
  },

  removeBoardFromContent(state: IUserState, payload: string): void {
    state.userContent.boards = state.userContent.boards.filter(
      (board) => board.id !== payload
    );
  },

  setUserData(state: IUserState, payload: IUserData): void {
    state.userData = payload;
  },

  setIsLoggedIn(state: IUserState, payload: boolean): void {
    state.isLoggedIn = payload;
  },

  setLogoutState(state: IUserState): void {
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
};

export default mutations;
