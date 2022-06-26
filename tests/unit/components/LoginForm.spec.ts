import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import LoginForm from "@/components/Login/LoginForm.vue";
import router from "@/router";

describe("Given a LoginForm component", () => {
  let store = createStore({});

  describe("When it is rendered", () => {
    test("Then it renders", () => {
      mount(LoginForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });
    });
    test("Then the it matches the snapshot", () => {
      const wrapper = mount(LoginForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });
      expect(wrapper.element).toMatchSnapshot();
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
  });
  describe("When it renders the form", () => {
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
    test("Then the form contains a login button", () => {
      const wrapper = mount(LoginForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const button = wrapper.find("button.login-form__button--login");

      expect(button.text()).toContain("LOG IN");
    });
  });
  describe("When I don't write on the inputs", () => {
    test("Then the login button must be disabled", async () => {
      const wrapper = mount(LoginForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const button = wrapper.find("button.login-form__button--login");

      expect(button.element.getAttributeNames()).toContain("disabled");
    });
    test("The message is not triggered", async () => {
      const wrapper = mount(LoginForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      await wrapper.find("form").trigger("submit.prevent");

      expect(wrapper.find(".message").text()).toBe("");
    });
  });
  describe("When I write on the inputs", () => {
    test("Then the value is set", async () => {
      store = createStore({});
      const wrapper = mount(LoginForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const [inputName, inputPassword] = wrapper.findAll("input");
      inputName.setValue("name");
      inputPassword.setValue("password");

      expect(inputName.element.value).toBe("name");
      expect(inputPassword.element.value).toBe("password");
    });
  });
  describe("When I write wrong data on the inputs and I click the login button", () => {
    test("Then the message is shown", async () => {
      store = createStore({});
      const wrapper = mount(LoginForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const [inputName, inputPassword] = wrapper.findAll("input");
      inputName.setValue("name");
      inputPassword.setValue("password");
      await wrapper.find("form").trigger("submit.prevent");

      expect(wrapper.vm.$data.isMessageShown).toBe(true);
    });
    test("Then it calls the message 'Wrong username or password. Try again'", async () => {
      store = createStore({});
      const wrapper = mount(LoginForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const [inputName, inputPassword] = wrapper.findAll("input");
      inputName.setValue("name");
      inputPassword.setValue("password");
      await wrapper.find("form").trigger("submit.prevent");

      expect(wrapper.find(".message").text()).toBe(
        "Wrong username or password. Try again"
      );
    });
  });
  describe("When I write right data on the inputs and I click the login button", () => {
    test("Then it the message is sill not shown", async () => {
      const $route = { path: "/userBoard" };
      const loginUserMock = jest.fn().mockResolvedValue(200);
      store = createStore({
        modules: {
          user: {
            namespaced: true,
            actions: {
              loginUser: loginUserMock,
            },
          },
        },
        getters: {
          redirectToUserBoard: jest.fn(),
        },
      });
      const wrapper = mount(LoginForm, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          $route,
        },
        stubs: ["router-view", "router-link"],
      });

      const [inputName, inputPassword] = wrapper.findAll("input");
      inputName.setValue("name");
      inputPassword.setValue("password");
      await wrapper.find("form").trigger("submit.prevent");

      expect(wrapper.vm.$data.isMessageShown).toBe(false);
      expect(loginUserMock).toHaveBeenCalled();
    });
    test("Then it the message remains unchanged", async () => {
      const $route = { path: "/userBoard" };
      store = createStore({
        modules: {
          user: {
            namespaced: true,
            actions: {
              loginUser: jest.fn().mockResolvedValue(200),
            },
          },
        },
        getters: {
          redirectToUserBoard: jest.fn(),
        },
      });
      const wrapper = mount(LoginForm, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          $route,
        },
        stubs: ["router-view", "router-link"],
      });

      const [inputName, inputPassword] = wrapper.findAll("input");
      inputName.setValue("name");
      inputPassword.setValue("password");
      await wrapper.find("form").trigger("submit.prevent");

      expect(wrapper.find(".message").text()).toBe("");
    });
    test("Then the loginUser action is called", async () => {
      const $route = { path: "/userBoard" };
      const loginUserMock = jest.fn().mockResolvedValue(200);
      store = createStore({
        modules: {
          user: {
            namespaced: true,
            actions: {
              loginUser: loginUserMock,
            },
          },
        },
        getters: {
          redirectToUserBoard: jest.fn(),
        },
      });
      const wrapper = mount(LoginForm, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          $route,
        },
        stubs: ["router-view", "router-link"],
      });

      const [inputName, inputPassword] = wrapper.findAll("input");
      inputName.setValue("name");
      inputPassword.setValue("password");
      await wrapper.find("form").trigger("submit.prevent");

      expect(loginUserMock).toHaveBeenCalled();
    });
    test("Then the redirectToUserBoard getter is called", async () => {
      const $route = { path: "/userBoard" };
      const loginUserMock = jest.fn().mockResolvedValue(200);
      const redirectToUserBoardMock = jest.fn();
      store = createStore({
        modules: {
          user: {
            namespaced: true,
            actions: {
              loginUser: loginUserMock,
            },
          },
        },
        getters: {
          redirectToUserBoard: redirectToUserBoardMock,
        },
      });
      const wrapper = mount(LoginForm, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          $route,
        },
        stubs: ["router-view", "router-link"],
      });

      const [inputName, inputPassword] = wrapper.findAll("input");
      inputName.setValue("name");
      inputPassword.setValue("password");
      await wrapper.find("form").trigger("submit.prevent");

      expect(redirectToUserBoardMock).toHaveBeenCalled();
    });
  });
});
