import router from "@/router";
import paths from "../router/paths";

const getters = {
  redirectToUserBoard(): void {
    router.push(paths.userBoard);
  },
  redirectToLogin(): void {
    router.push(paths.login);
  },
  redirectToRegister(): void {
    router.push(paths.register);
  },
};

export default getters;
