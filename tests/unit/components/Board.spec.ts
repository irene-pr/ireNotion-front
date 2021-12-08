import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { VueDraggableNext } from "vue-draggable-next";
import { IState } from "@/types/interfaces";
import Note from "@/components/Board/Note.vue";
import Board from "@/components/Board/Board.vue";

library.add(fas);

describe("Given a BoardEdit component", () => {
  let mockedState: IState;
  let createParagraphNoteMock = jest.fn();
  let deleteBoardMock = jest.fn();
  let setIdForModalMock = jest.fn();
  let editNameBoardMock = jest.fn();
  let setBoardEditModalMock = jest.fn();
  let onclickAddNoteMock = jest.fn();
  let onClickOpenModalMock = jest.fn();
  let onClickDeleteBoardMock = jest.fn();
  let store = createStore({});
  let options = {
    data() {
      return {
        enabled: true,
        dragging: false,
      };
    },
    components: {
      "font-awesome-icon": FontAwesomeIcon,
      draggable: VueDraggableNext,
      Note,
    },
    stubs: ["FontAwesomeIcon"],
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
        "font-awesome-icon": FontAwesomeIcon,
        draggable: VueDraggableNext,
        Note,
      },
      stubs: ["FontAwesomeIcon"],
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
        "font-awesome-icon": FontAwesomeIcon,
        draggable: VueDraggableNext,
        Note,
      },
      stubs: ["FontAwesomeIcon"],
      global: {
        plugins: [store],
      },
      methods: {
        onclickAddNote: onclickAddNoteMock,
        onClickOpenModal: onClickOpenModalMock,
        onClickDeleteBoard: onClickDeleteBoardMock,
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
    createParagraphNoteMock = jest.fn();
    deleteBoardMock = jest.fn();
    setIdForModalMock = jest.fn();
    editNameBoardMock = jest.fn();
    setBoardEditModalMock = jest.fn();
    onclickAddNoteMock = jest.fn();
    onClickOpenModalMock = jest.fn();
    onClickDeleteBoardMock = jest.fn();
    store = createStore({
      state() {
        return mockedState;
      },
      actions: {
        createParagraphNote: createParagraphNoteMock,
        deleteBoard: deleteBoardMock,
        editNameBoard: editNameBoardMock,
        setIdForModal: setIdForModalMock,
        setBoardEditModal: setBoardEditModalMock,
      },
    });
  });
  describe("When it is rendered", () => {
    test("Then it renders", () => {
      options = getOptions();
      mount(Board, options);
    });
    test("Then the it matches the snapshot", () => {
      options = getOptions();
      const wrapper = mount(Board, options);
      expect(wrapper.element).toMatchSnapshot();
    });
    test("Then it renders at least a Note component", () => {
      options = getOptions();
      const wrapper = mount(Board, options);

      wrapper.getComponent(Note);
    });
    test("Then it renders a Header", () => {
      options = getOptions();
      const wrapper = mount(Board, options);

      const header = wrapper.find("h2");

      expect(header.exists()).toBeTruthy();
    });
    test("Then it renders two buttons", () => {
      options = getOptions();
      const wrapper = mount(Board, options);

      const buttons = wrapper.findAll("button");

      expect(buttons).toHaveLength(2);
    });
  });
  describe("When you double click on the Header", () => {
    test("Then the method onClickOpenModal gets called", () => {
      options = getOptionsWithMethods();
      const wrapper = mount(Board, options);

      const header = wrapper.find(".board-header__top");
      header.trigger("dblclick");

      expect(onClickOpenModalMock).toHaveBeenCalled();
    });
  });
  describe("When you click on the pencil icon", () => {
    test("Then the method onClickOpenModal gets called", () => {
      options = getOptionsWithMethods();
      const wrapper = mount(Board, options);

      const pencil = wrapper.find(".form__icon-edit");
      pencil.trigger("click");

      expect(onClickOpenModalMock).toHaveBeenCalled();
    });
    test("Then the action setBoardEditModal gets called", () => {
      options = getOptions();
      const wrapper = mount(Board, options);

      const pencil = wrapper.find(".form__icon-edit");
      pencil.trigger("click");

      expect(setBoardEditModalMock).toHaveBeenCalled();
    });
    test("Then the action setIdForModal gets called", () => {
      options = getOptions();
      const wrapper = mount(Board, options);

      const pencil = wrapper.find(".form__icon-edit");
      pencil.trigger("click");

      expect(setIdForModalMock).toHaveBeenCalled();
    });
  });
  describe("When you click on the cross icon", () => {
    test("Then the method onClickDeleteBoardMock gets called", () => {
      options = getOptionsWithMethods();
      const wrapper = mount(Board, options);

      const cross = wrapper.find(".form__icon-close");
      cross.trigger("click");

      expect(onClickDeleteBoardMock).toHaveBeenCalled();
    });
    test("Then the action deleteBoard gets called", () => {
      options = getOptions();
      const wrapper = mount(Board, options);

      const cross = wrapper.find(".form__icon-close");
      cross.trigger("click");

      expect(deleteBoardMock).toHaveBeenCalled();
    });
  });
  describe("When you click on the add note button", () => {
    test("Then the method onclickAddNote gets called", () => {
      options = getOptionsWithMethods();
      const wrapper = mount(Board, options);

      const addNote = wrapper.find(".board-header__button--note");
      addNote.trigger("click");

      expect(onclickAddNoteMock).toHaveBeenCalled();
    });
    test("Then the actions createParagraphNote gets called", () => {
      options = getOptions();
      const wrapper = mount(Board, options);

      const addNote = wrapper.find(".board-header__button--note");
      addNote.trigger("click");

      expect(createParagraphNoteMock).toHaveBeenCalled();
    });
  });
});
