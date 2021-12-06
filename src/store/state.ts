const state = {
  isLoggedIn: false,
  userContent: {
    name: "",
    boards: [],
  },
  userData: {
    userId: "",
    username: "",
  },
  themeHeaders: "night-mode",
  themeSurfaces: "day-mode",
  isBoardEditModal: false,
  isUpdateNoteModal: false,
  idForModal: "",
};

export default state;
