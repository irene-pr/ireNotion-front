import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import Register from "../../../src/views/Register.vue";
import state from "@/store/state";
import userState from "@/store/user/state";
import router from "@/router";
import RegisterForm from "@/components/Login/RegisterForm.vue";

describe("Given a Register view", () => {
  let checkTokenMock = jest.fn();
  let redirectToUserBoardMock = jest.fn();
  let store = createStore({});

  beforeEach(() => {
    checkTokenMock = jest.fn();
    redirectToUserBoardMock = jest.fn();
    store = createStore({
      state() {
        return state;
      },
      modules: {
        user: {
          namespaced: true,
          state() {
            return userState;
          },
          actions: {
            checkToken: checkTokenMock,
          },
        },
      },
      getters: {
        redirectToUserBoard: redirectToUserBoardMock,
      },
    });
  });

  describe("When it is rendered", () => {
    test("Then it renders", () => {
      mount(Register, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });
    });
    test("Then the it matches the snapshot", () => {
      const wrapper = mount(Register, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    test("Then it renders the Register form", () => {
      const wrapper = mount(Register, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const registerForm = wrapper.getComponent(RegisterForm);

      expect(registerForm).toBeTruthy();
    });
    test("Then the action checkToken should be called", () => {
      mount(Register, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      expect(checkTokenMock).toHaveBeenCalled();
    });
    test("Then it doesn't call the redirectToUserBoard getter", () => {
      mount(Register, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-link", "router-view"],
      });
      expect(redirectToUserBoardMock).not.toHaveBeenCalled();
    });
  });
  describe("When the isLoggedIn state is true", () => {
    test("Then it calls the redirectToUserBoard getter", () => {
      userState.isLoggedIn = true;

      mount(Register, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-link", "router-view"],
      });
      expect(redirectToUserBoardMock).toHaveBeenCalled();
    });
    test("Then it redirects to /userBoard", () => {
      state.isLoggedIn = true;
      const $route = { path: "/userBoard" };

      const wrapper = mount(Register, {
        global: {
          plugins: [router, store],
          mocks: {
            $route,
          },
        },
        stubs: ["router-link", "router-view"],
      });
      expect(wrapper.vm.$route.path).toContain($route.path);
    });
  });
});
