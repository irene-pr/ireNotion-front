import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import Login from "../../../src/views/Login.vue";
import state from "@/store/state";
import router from "@/router";
import LoginForm from "@/components/Login/LoginForm.vue";

describe("Given a Login view", () => {
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
      actions: {
        checkToken: checkTokenMock,
      },
      getters: {
        redirectToUserBoard: redirectToUserBoardMock,
      },
    });
  });

  describe("When it is rendered", () => {
    test("Then it renders", () => {
      mount(Login, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });
    });
    test("Then the it matches the snapshot", () => {
      const wrapper = mount(Login, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    test("Then it renders the login form", () => {
      const wrapper = mount(Login, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const loginForm = wrapper.getComponent(LoginForm);

      expect(loginForm).toBeTruthy();
    });
    test("Then the action checkToken should be called", () => {
      mount(Login, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      expect(checkTokenMock).toHaveBeenCalled();
    });
    test("Then it doesn't call the redirectToUserBoard getter", () => {
      mount(Login, {
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
      state.isLoggedIn = true;

      mount(Login, {
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

      const wrapper = mount(Login, {
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
