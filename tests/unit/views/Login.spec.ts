import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import Login from "../../../src/views/Login.vue";
import state from "@/store/state";
import router from "@/router";
import LoginForm from "@/components/Login/LoginForm.vue";

describe("Given a Login view", () => {
  const store = createStore({
    state() {
      return state;
    },
    actions: {
      checkToken: jest.fn(),
    },
    getters: {
      redirectToUserBoard: jest.fn(),
    },
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
  });
  describe("When the isLoggedIn state is true", () => {
    test("Then it invokes the redirectToUserBoard getter", () => {
      state.isLoggedIn = true;

      mount(Login, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-link", "router-view"],
      });
    });
  });
});
