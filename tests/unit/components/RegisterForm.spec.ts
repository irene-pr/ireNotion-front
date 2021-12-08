import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import state from "@/store/state";
import RegisterForm from "@/components/Login/RegisterForm.vue";
import router from "@/router";

describe("Given a RegisterForm component", () => {
  let store = createStore({
    state() {
      return state;
    },
  });

  describe("When it is rendered", () => {
    test("Then it renders", () => {
      mount(RegisterForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });
    });
    test("Then the it matches the snapshot", () => {
      const wrapper = mount(RegisterForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    test("Then it renders a main header", () => {
      const wrapper = mount(RegisterForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const mainHeader = wrapper.find("h1");
      expect(mainHeader.text()).toContain("ireNotion");
    });

    test("Then it renders the login button", () => {
      const wrapper = mount(RegisterForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const button = wrapper.find("button.register-form__button--login");

      expect(button.text()).toContain("LOG IN");
    });
    test("Then the divider renders an 'or", () => {
      const wrapper = mount(RegisterForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const divider = wrapper.find("div.divider");

      expect(divider.html()).toContain('<p class="divider__or">or</p>');
    });
    test("Then it renders a form", () => {
      const wrapper = mount(RegisterForm, {
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
    test("Then the form contains an input and a label for the name", () => {
      const wrapper = mount(RegisterForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const form = wrapper.find("form");
      const nameInput = form.find('input[id="name"]');
      const nameLabel = form.find('label[for="name"]');

      expect(nameInput.exists).toBeTruthy();
      expect(nameLabel.exists).toBeTruthy();
    });
    test("Then the form contains an input and a label for the username", () => {
      const wrapper = mount(RegisterForm, {
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
      const wrapper = mount(RegisterForm, {
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
    test("Then the form contains a signup button", () => {
      const wrapper = mount(RegisterForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const button = wrapper.find("button.register-form__button--signup");

      expect(button.text()).toContain("SIGN UP");
    });
  });

  describe("When I don't write on the inputs", () => {
    test("Then the signup button must be disabled", async () => {
      const wrapper = mount(RegisterForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const button = wrapper.find("button.register-form__button--signup");

      expect(button.element.getAttributeNames()).toContain("disabled");
    });
    test("The message is not triggered", async () => {
      const wrapper = mount(RegisterForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      await wrapper
        .find("button.register-form__button--signup")
        .trigger("click");

      expect(wrapper.find(".message").text()).toBe("");
    });
  });
  describe("When I write on the inputs", () => {
    test("Then the value is set", async () => {
      store = createStore({
        state() {
          return state;
        },
      });
      const wrapper = mount(RegisterForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const [inputName, inputUsername, inputPassword, inputRepeatPassword] =
        wrapper.findAll("input");
      inputName.setValue("name");
      inputUsername.setValue("username");
      inputPassword.setValue("password");
      inputRepeatPassword.setValue("repeatPassword");

      expect(inputName.element.value).toBe("name");
      expect(inputUsername.element.value).toBe("username");
      expect(inputPassword.element.value).toBe("password");
      expect(inputRepeatPassword.element.value).toBe("repeatPassword");
    });
  });
  describe("When I write different passwords on the inputs and I click the signup button", () => {
    test("Then the message 'The passwords don't match. Try again' is shown", async () => {
      store = createStore({
        state() {
          return state;
        },
        actions: {
          registerUser: jest.fn().mockResolvedValue(401),
        },
      });
      const wrapper = mount(RegisterForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const [inputName, inputUsername, inputPassword, inputRepeatPassword] =
        wrapper.findAll("input");
      inputName.setValue("name");
      inputUsername.setValue("username");
      inputPassword.setValue("password");
      inputRepeatPassword.setValue("repeatPassword");

      await wrapper.find("form").trigger("submit.prevent");

      expect(wrapper.vm.$data.messageShown).toBe(
        "The passwords don't match. Try again"
      );
    });
  });
  describe("When I write matching passwords with a length lesser than 7 on the inputs and I click the signup button", () => {
    test("Then the message 'The password must have between 7 and 20 characters' is shown", async () => {
      store = createStore({
        state() {
          return state;
        },
        actions: {
          registerUser: jest.fn().mockResolvedValue(401),
        },
      });
      const wrapper = mount(RegisterForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const [inputName, inputUsername, inputPassword, inputRepeatPassword] =
        wrapper.findAll("input");
      inputName.setValue("name");
      inputUsername.setValue("username");
      inputPassword.setValue("pass");
      inputRepeatPassword.setValue("pass");

      await wrapper.find("form").trigger("submit.prevent");

      expect(wrapper.vm.$data.messageShown).toBe(
        "The password must have between 7 and 20 characters"
      );
    });
  });
  describe("When I write matching passwords with a length greater than 20 on the inputs and I click the signup button", () => {
    test("Then the message 'The password must have between 7 and 20 characters' is shown", async () => {
      store = createStore({
        state() {
          return state;
        },
        actions: {
          registerUser: jest.fn().mockResolvedValue(401),
        },
      });
      const wrapper = mount(RegisterForm, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const [inputName, inputUsername, inputPassword, inputRepeatPassword] =
        wrapper.findAll("input");
      inputName.setValue("name");
      inputUsername.setValue("username");
      inputPassword.setValue(
        "passssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
      );
      inputRepeatPassword.setValue(
        "passssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
      );

      await wrapper.find("form").trigger("submit.prevent");

      expect(wrapper.vm.$data.messageShown).toBe(
        "The password must have between 7 and 20 characters"
      );
    });
  });
  describe("When I write an existing username in the input and I click the signup button", () => {
    test("Then the message reads 'Username already exists'", async () => {
      const $route = { path: "/userBoard" };
      store = createStore({
        state() {
          return state;
        },
        actions: {
          registerUser: jest.fn().mockResolvedValue("Username already exists"),
        },
        getters: {
          redirectToLogin: jest.fn(),
        },
      });
      const wrapper = mount(RegisterForm, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          $route,
        },
        stubs: ["router-view", "router-link"],
      });

      const [inputName, inputUsername, inputPassword, inputRepeatPassword] =
        wrapper.findAll("input");
      inputName.setValue("name");
      inputUsername.setValue("username");
      inputPassword.setValue("password");
      inputRepeatPassword.setValue("password");

      await wrapper.find("form").trigger("submit.prevent");

      expect(wrapper.vm.$data.messageShown).toBe("Username already exists");
    });
  });
  describe("When I write right data on the inputs and I click the signup button", () => {
    test("Then it the message remains unchanged", async () => {
      const onSubmitMock = jest.fn();
      const $route = { path: "/userBoard" };
      store = createStore({
        state() {
          return state;
        },
        actions: {
          registerUser: jest.fn(),
        },
        getters: {
          redirectToLogin: jest.fn(),
        },
      });
      const wrapper = mount(RegisterForm, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          $route,
        },
        stubs: ["router-view", "router-link"],
        methods: {
          onSubmit: onSubmitMock,
        },
      });

      const [inputName, inputUsername, inputPassword, inputRepeatPassword] =
        wrapper.findAll("input");
      inputName.setValue("name");
      inputUsername.setValue("username");
      inputPassword.setValue("password");
      inputRepeatPassword.setValue("password");

      await wrapper.find("form").trigger("submit.prevent");

      expect(onSubmitMock).toHaveBeenCalled();
    });
    test("Then it the message remains unchanged", async () => {
      const redirectToLoginMock = jest.fn();
      const $route = { path: "/userBoard" };
      store = createStore({
        state() {
          return state;
        },
        actions: {
          registerUser: jest.fn().mockResolvedValue(200),
        },
        getters: {
          redirectToLogin: redirectToLoginMock,
        },
      });
      const wrapper = mount(RegisterForm, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          $route,
        },
        stubs: ["router-view", "router-link"],
      });

      const [inputName, inputUsername, inputPassword, inputRepeatPassword] =
        wrapper.findAll("input");
      inputName.setValue("name");
      inputUsername.setValue("username");
      inputPassword.setValue("password");
      inputRepeatPassword.setValue("password");

      await wrapper.find("form").trigger("submit.prevent");

      expect(redirectToLoginMock).toHaveBeenCalled();
    });
    test("Then it the message remains unchanged", async () => {
      const $route = { path: "/userBoard" };
      store = createStore({
        state() {
          return state;
        },
        actions: {
          registerUser: jest.fn().mockResolvedValue(200),
        },
        getters: {
          redirectToUserBoard: jest.fn(),
        },
      });
      const wrapper = mount(RegisterForm, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          $route,
        },
        stubs: ["router-view", "router-link"],
      });

      const [inputName, inputUsername, inputPassword, inputRepeatPassword] =
        wrapper.findAll("input");
      inputName.setValue("name");
      inputUsername.setValue("username");
      inputPassword.setValue("password");
      inputRepeatPassword.setValue("password");

      expect(wrapper.find(".message").text()).toBe("");
    });
    test("Then it the message data value remains unchanged", async () => {
      const $route = { path: "/userBoard" };
      store = createStore({
        state() {
          return state;
        },
        actions: {
          registerUser: jest.fn().mockResolvedValue(200),
        },
        getters: {
          redirectToUserBoard: jest.fn(),
        },
      });
      const wrapper = mount(RegisterForm, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          $route,
        },
        stubs: ["router-view", "router-link"],
      });

      const [inputName, inputUsername, inputPassword, inputRepeatPassword] =
        wrapper.findAll("input");
      inputName.setValue("name");
      inputUsername.setValue("username");
      inputPassword.setValue("password");
      inputRepeatPassword.setValue("password");

      expect(wrapper.vm.$data.messageShown).toBe("");
    });
  });
});
