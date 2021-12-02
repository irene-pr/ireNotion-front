import { mount, shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import Home from "../../../src/views/Home.vue";
import NavHome from "../../../src/components/Home/NavHome.vue";
import state from "@/store/state";
import router from "@/router";

describe("Given a Home view", () => {
  const store = createStore({
    state() {
      return state;
    },
  });

  describe("When it is rendered", () => {
    test("it renders", () => {
      mount(Home, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-view"],
      });
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
});
