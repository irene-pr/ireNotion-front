import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import Register from "../../../src/views/Register.vue";
import state from "@/store/state";
import router from "@/router";
import RegisterForm from "@/components/Login/RegisterForm.vue";

describe("Given a Register view", () => {
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
  });
  describe("When the isLoggedIn state is true", () => {
    test("Then it invokes the redirectToUserBoard getter", () => {
      state.isLoggedIn = true;

      mount(Register, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-link", "router-view"],
      });
    });
  });
});
