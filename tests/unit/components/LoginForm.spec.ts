import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import state from "@/store/state";
import LoginForm from "@/components/Login/LoginForm.vue";
import router from "@/router";

describe("Given a LoginForm component", () => {
  const store = createStore({
    state() {
      return state;
    },
  });

  describe("When it is rendered", () => {
    test("Then it renders", () => {
      mount(LoginForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });
    });
    test("Then it renders a main header", () => {
      const wrapper = mount(LoginForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const mainHeader = wrapper.find("h1");
      expect(mainHeader.text()).toContain("ireNotion");
    });
    test("Then it renders a secondary header", () => {
      const wrapper = mount(LoginForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const mainHeader = wrapper.find("h2");
      expect(mainHeader.text()).toContain("Welcome back to ireNotion");
    });
    test("Then it renders the signup button", () => {
      const wrapper = mount(LoginForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const button = wrapper.find("button.login-form__button--signup");

      expect(button.text()).toContain("SIGN UP");
    });
    test("Then the divider renders an 'or", () => {
      const wrapper = mount(LoginForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const divider = wrapper.find("div.divider");

      expect(divider.html()).toContain('<p class="divider__or">or</p>');
    });
  });
  describe("When it renders the form", () => {
    test("Then it renders a form", () => {
      const wrapper = mount(LoginForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const form = wrapper.findAll("form");

      expect(form).toHaveLength(1);
    });
    test("Then the form contains an input and a label for the username", () => {
      const wrapper = mount(LoginForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const form = wrapper.find("form");
      const usernameInput = form.find('input[id="username"]');
      const usernameLabel = form.find('label[for="username"]');

      expect(usernameInput.exists).toBeTruthy();
      expect(usernameLabel.exists).toBeTruthy();
    });
    test("Then the form contains an input and a label for the password", () => {
      const wrapper = mount(LoginForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const form = wrapper.find("form");
      const passwordInput = form.find('input[id="password"]');
      const passwordLabel = form.find('label[for="password"]');

      expect(passwordInput.exists).toBeTruthy();
      expect(passwordLabel.exists).toBeTruthy();
    });
    /*  test("Then when I type in the username and password it gets written", async () => {
      const wrapper = mount(LoginForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const form = wrapper.find("form");
      const usernameInput = form.find('input[id="username"]');
      const passwordInput = form.find('input[id="password"]');

      await usernameInput.setValue("Mario");
      await passwordInput.setValue("Mario");

      expect(usernameInput).toBe("mario");
    }); */
    /*   test("Then when I type in the username and password it gets written", async () => {
      const wrapper = mount(LoginForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
        mocks: {
          $store: {
            state: {
              isLoggedIn: false,
              userContent: {
                name: "",
                boards: [],
              },
              userId: "",
              token: "",
            },
            actions: {
              loginUser: jest.fn(),
            },
            dispatch: jest.fn(),
          },
        },
      });

      const form = wrapper.find("form");
      const usernameInput = form.find('input[id="username"]');
      const passwordInput = form.find('input[id="password"]');
      const onSubmit = jest.fn();

      await usernameInput.setValue("Mario");
      await passwordInput.setValue("Mario");
      await form.trigger("submit");
      form.expect(onSubmit).toBeCalled();
    }); */
  });
});
