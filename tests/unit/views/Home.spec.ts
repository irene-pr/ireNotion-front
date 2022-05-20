import { mount, shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import Home from "../../../src/views/Home.vue";
import NavHome from "../../../src/components/Home/NavHome.vue";
import state from "@/store/state";
import router from "@/router";

describe("Given a Home view", () => {
  let checkTokenMock = jest.fn();
  let redirectToUserBoardMock = jest.fn();
  let store = createStore({});

  beforeEach(() => {
    checkTokenMock = jest.fn();
    redirectToUserBoardMock = jest.fn();
    store = createStore({
      getters: {
        redirectToUserBoard: redirectToUserBoardMock,
      },
      modules: {
        user: {
          namespaced: true,
          state() {
            return state;
          },
          actions: {
            checkToken: checkTokenMock,
          },
        },
      },
    });
  });

  describe("When it is rendered", () => {
    test("Then it renders", () => {
      mount(Home, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });
    });
    test("Then the it matches the snapshot", () => {
      const wrapper = mount(Home, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    test("Then the action checkToken should be called", () => {
      mount(Home, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      expect(checkTokenMock).toHaveBeenCalled();
    });
    test("Then the getter redirectToUserBoard should not be called", () => {
      mount(Home, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      expect(redirectToUserBoardMock).not.toHaveBeenCalled();
    });
    test("it renders the component NavHome", () => {
      const wrapper = mount(Home, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      wrapper.getComponent(NavHome);
    });
    test("it contains 4 div nodes", () => {
      const wrapper = mount(Home, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const divs = wrapper.findAll("div");

      expect(divs).toHaveLength(4);
    });
    test("it contains 2 div nodes with classes 'medium-height-div' and modifiers", () => {
      const wrapper = mount(Home, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const divs = wrapper.findAll("div");

      expect(divs[1].classes()).toContain("medium-height-div");
      expect(divs[1].classes()).toContain("medium-height-div--first");
      expect(divs[2].classes()).toContain("medium-height-div");
      expect(divs[2].classes()).toContain("medium-height-div--second");
    });
    test("it contains 2 div nodes with classes 'full-height-div' and modifiers", () => {
      const wrapper = mount(Home, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const divs = wrapper.findAll("div");

      expect(divs[0].classes()).toContain("full-height-div");
      expect(divs[0].classes()).toContain("full-height-div--top");
      expect(divs[3].classes()).toContain("full-height-div");
      expect(divs[3].classes()).toContain("full-height-div--bottom");
    });
    test("it contains 2 div nodes with a h1 node that has a span node", () => {
      const wrapper = mount(Home, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const divs = wrapper.findAll("div");

      expect(divs[0].find("h1").find("span").text()).toContain("N");
      expect(divs[3].find("h1").find("span").text()).toContain("N");
    });
    test("it contains 3 section nodes", () => {
      const wrapper = mount(Home, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const sections = wrapper.findAll("section");

      expect(sections).toHaveLength(3);
    });
    test("it contains 3 section nodes with classes 'text-section' and modifiers", () => {
      const wrapper = mount(Home, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const sections = wrapper.findAll("section");

      expect(sections[0].classes()).toContain("text-section");
      expect(sections[0].classes()).toContain("text-section--light");
      expect(sections[1].classes()).toContain("text-section");
      expect(sections[1].classes()).toContain("text-section--dark");
      expect(sections[2].classes()).toContain("text-section");
      expect(sections[2].classes()).toContain("text-section--light");
    });
    test("it contains 3 section nodes that contain a paragraph and a header", () => {
      const wrapper = shallowMount(Home, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const sections = wrapper.findAll("section");

      expect(sections[0].find("p")).toBeTruthy();
      expect(sections[1].find("p")).toBeTruthy();
      expect(sections[2].find("p")).toBeTruthy();
      expect(sections[0].find("h2")).toBeTruthy();
      expect(sections[1].find("h2")).toBeTruthy();
      expect(sections[2].find("h2")).toBeTruthy();
    });
    test("it contains 3 section nodes that contain a paragraph and a header with the text content they shouls have", () => {
      const wrapper = shallowMount(Home, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });

      const sections = wrapper.findAll("section");

      expect(sections[0].find("p").text()).toContain(
        "This is my final project for the ISDI Coders fulltime bootcamp"
      );
      expect(sections[1].find("p").text()).toContain(
        "It's a Full Stack development project written with Typescript."
      );
      expect(sections[2].find("p").text()).toContain(
        "I thank all of my teachers and classmates for everything I've learned and experienced during the bootcamp."
      );
      expect(sections[0].html()).toContain("<h2>About the website</h2>");
      expect(sections[0].find("h2").text()).toContain("About the website");
      expect(sections[1].html()).toContain("<h2>Technologies I've used</h2>");
      expect(sections[1].find("h2").text()).toContain("Technologies I've used");
      expect(sections[2].html()).toContain("<h2>Message of Thanks</h2>");
      expect(sections[2].find("h2").text()).toContain("Message of Thanks");
    });
  });
  describe("When the isLoggedIn state is true", () => {
    test("Then it calls the getter redirectToUserBoard", () => {
      state.isLoggedIn = true;

      mount(Home, {
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

      const wrapper = mount(Home, {
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
