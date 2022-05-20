import { IState } from "@/types/store";

const state: IState = {
  isLoading: false,
  isLoggedIn: false,
  userContent: {
    name: "",
    boards: [],
  },
  userData: {
    userId: "",
    username: "",
  },
  isBoardEditModal: false,
  isUpdateNoteModal: false,
  idForModal: "",
  themeHeaders: "",
  themeSurfaces: "",
};

export default state;
