import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { IState } from "@/types/interfaces";
import BoardPage from "@/views/BoardPage.vue";
import Board from "@/components/Board/Board.vue";
import BoardEdit from "@/components/Modals/BoardEdit.vue";
import UpdateNote from "@/components/Modals/UpdateNote.vue";

describe("Given a BoardPage view", () => {
  let mockedState: IState;
  let toggleThemeMock = jest.fn();
  let getUserContentMock = jest.fn();
  let checkTokenMock = jest.fn();
  let logoutUserMock = jest.fn();
  let createBoardMock = jest.fn();
  let onClickLogoutMock = jest.fn();
  let onClickCreateBoardMock = jest.fn();
  let onClickToggleThemeMock = jest.fn();
  let redierectToHomeMock = jest.fn();
  let store = createStore({});
  let options = {
    data() {
      return {
        enabled: true,
        dragging: false,
      };
    },
    components: {
      Board,
      BoardEdit,
      UpdateNote,
    },
    global: {
      plugins: [store],
    },
    mocks: {
      $store: store,
    },
    props: {
      board: {
        type: "board",
        name: "tablero1",
        notes: [{ type: "paragraph", color: "yellow" }],
        id: "123",
      },
    },
  };
  function getOptions() {
    return {
      data() {
        return {
          enabled: true,
          dragging: false,
        };
      },
      components: {
        Board,
        BoardEdit,
        UpdateNote,
      },
      global: {
        plugins: [store],
      },
      mocks: {
        $store: store,
      },
      props: {
        board: {
          type: "board",
          name: "tablero1",
          notes: [{ type: "paragraph", color: "yellow" }],
          id: "123",
        },
      },
    };
  }
  function getOptionsWithMethods() {
    return {
      data() {
        return {
          enabled: true,
          dragging: false,
        };
      },
      components: {
        Board,
        BoardEdit,
        UpdateNote,
      },
      global: {
        plugins: [store],
      },
      methods: {
        onClickLogout: onClickLogoutMock,
        onClickCreateBoard: onClickCreateBoardMock,
        onClickToggleTheme: onClickToggleThemeMock,
      },
      mocks: {
        $store: store,
      },
      props: {
        board: {
          type: "board",
          name: "tablero1",
          notes: [{ type: "paragraph", color: "yellow" }],
          id: "123",
        },
      },
    };
  }

  beforeEach(() => {
    mockedState = {
      isLoading: false,
      isLoggedIn: true,
      userContent: {
        name: "Franny",
        boards: [
          {
            type: "board",
            name: "tablero1",
            notes: [{ type: "paragraph", color: "yellow" }],
            id: "123",
          },
          {
            type: "board",
            name: "tablero2",
            notes: [{ type: "paragraph", color: "yellow" }],
            id: "234",
          },
        ],
      },
      userData: {
        userId: "",
        username: "",
      },
      themeHeaders: "night-mode",
      themeSurfaces: "day-mode",
      isBoardEditModal: false,
      isUpdateNoteModal: false,
      idForModal: "",
    };
    toggleThemeMock = jest.fn();
    getUserContentMock = jest.fn();
    checkTokenMock = jest.fn();
    logoutUserMock = jest.fn();
    createBoardMock = jest.fn();
    onClickLogoutMock = jest.fn();
    onClickCreateBoardMock = jest.fn();
    onClickToggleThemeMock = jest.fn();
    redierectToHomeMock = jest.fn();
    store = createStore({
      state() {
        return mockedState;
      },
      actions: {
        toggleTheme: toggleThemeMock,
        getUserContent: getUserContentMock,
        checkToken: checkTokenMock,
        logoutUser: logoutUserMock,
        createBoard: createBoardMock,
      },
      getters: {
        redierectToHome: redierectToHomeMock,
      },
    });
  });
  describe("When it is rendered", () => {
    test("Then it renders", () => {
      options = getOptions();
      mount(BoardPage, options);
    });
    test("Then the it matches the snapshot", () => {
      options = getOptions();
      const wrapper = mount(BoardPage, options);
      expect(wrapper.element).toMatchSnapshot();
    });
    test("Then it calls the action checkToken", () => {
      options = getOptions();
      mount(BoardPage, options);
      expect(checkTokenMock).toHaveBeenCalled();
    });
    test("Then it calls the action getUserContent", () => {
      options = getOptions();
      mount(BoardPage, options);
      expect(getUserContentMock).toHaveBeenCalled();
    });
    test("Then it renders header with the name of the User", () => {
      options = getOptions();
      const wrapper = mount(BoardPage, options);
      const header = wrapper.find("h1");

      expect(header.text()).toBe("Welcome, Franny!");
    });
  });
  describe("When the state isLoggedIn is false", () => {
    test("Then the getter redirectHome is called", () => {
      mockedState = {
        isLoading: false,
        isLoggedIn: false,
        userContent: {
          name: "Franny",
          boards: [
            {
              type: "board",
              name: "tablero1",
              notes: [{ type: "paragraph", color: "yellow" }],
              id: "123",
            },
            {
              type: "board",
              name: "tablero2",
              notes: [{ type: "paragraph", color: "yellow" }],
              id: "234",
            },
          ],
        },
        userData: {
          userId: "",
          username: "",
        },
        themeHeaders: "night-mode",
        themeSurfaces: "day-mode",
        isBoardEditModal: false,
        isUpdateNoteModal: false,
        idForModal: "",
      };
      store = createStore({
        state() {
          return mockedState;
        },
        actions: {
          toggleTheme: toggleThemeMock,
          getUserContent: getUserContentMock,
          checkToken: checkTokenMock,
          logoutUser: logoutUserMock,
          createBoard: createBoardMock,
        },
        getters: {
          redierectToHome: redierectToHomeMock,
        },
      });

      options = getOptions();
      mount(BoardPage, options);

      expect(redierectToHomeMock).toHaveBeenCalled();
    });
  });
  describe("When the header is clicked", () => {
    test("Then the action toggleTheme is called", () => {
      options = getOptions();
      const wrapper = mount(BoardPage, options);
      const header = wrapper.find("h1");

      header.trigger("click");

      expect(toggleThemeMock).toHaveBeenCalled();
    });
  });
  describe("When the logout button is clicked", () => {
    test("Then the action logout is called", () => {
      options = getOptions();
      const wrapper = mount(BoardPage, options);
      const logoutButton = wrapper.find(".nav-bar__button--logout");

      logoutButton.trigger("click");

      expect(logoutUserMock).toHaveBeenCalled();
    });
    test("Then the redirectToHome getter is called", () => {
      options = getOptions();
      const wrapper = mount(BoardPage, options);
      const logoutButton = wrapper.find(".nav-bar__button--logout");

      logoutButton.trigger("click");

      expect(redierectToHomeMock).toHaveBeenCalled();
    });
  });
  describe("When the add board button is clicked", () => {
    test("Then the action logout is called", () => {
      options = getOptions();
      const wrapper = mount(BoardPage, options);
      const addBoardButton = wrapper.find(".nav-bar__button--new-board");

      addBoardButton.trigger("click");

      expect(createBoardMock).toHaveBeenCalled();
    });
  });
});
