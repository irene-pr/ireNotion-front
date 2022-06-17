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
  isUpdateListNoteModal: false,
  isUpdateChecklistNoteModal: false,
  idForModal: "",
  themeHeaders: "",
  themeSurfaces: "",
  listForModal: [],
  checklistForModal: [],
};

export default state;
