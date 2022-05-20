import { IUserState } from "@/types/store";

const state = (): IUserState => ({
  isLoggedIn: false,
  userContent: {
    name: "",
    boards: [],
  },
  userData: {
    userId: "",
    username: "",
  },
  isLoading: false,
});

export default state;
