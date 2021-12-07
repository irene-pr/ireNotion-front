import router from "@/router";
import paths from "../router/paths";

const getters = {
  redirectToUserBoard(): void {
    router.push(paths.userBoard);
  },
};

export default getters;
