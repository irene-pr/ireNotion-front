import { ActionContext } from "vuex";
import { IModalState } from "@/types/store";

const actions = {
  setBoardEditModal(
    { commit }: ActionContext<IModalState, IModalState>,
    bool: boolean
  ): void {
    commit("setIsBoardEditModal", bool);
  },

  setUpdateNoteModal(
    { commit }: ActionContext<IModalState, IModalState>,
    bool: boolean
  ): void {
    commit("setIsUpdateNoteModal", bool);
  },

  setUpdateListNoteModal(
    { commit }: ActionContext<IModalState, IModalState>,
    bool: boolean
  ): void {
    commit("setIsUpdateListNoteModal", bool);
  },

  setUpdateChecklistNoteModal(
    { commit }: ActionContext<IModalState, IModalState>,
    bool: boolean
  ): void {
    commit("setIsUpdateChecklistNoteModal", bool);
  },

  setIdForModal(
    { commit }: ActionContext<IModalState, IModalState>,
    id: string
  ): void {
    commit("setIdForModal", id);
  },

  setListForModal(
    { commit }: ActionContext<IModalState, IModalState>,
    list: Array<string>
  ): void {
    commit("setListForModal", list);
  },

  addElementToModalList(
    { commit }: ActionContext<IModalState, IModalState>,
    sentence: string
  ): void {
    commit("addElementToModalList", sentence);
  },

  deleteElementFromModalList(
    { commit }: ActionContext<IModalState, IModalState>,
    index: number
  ): void {
    commit("deleteElementFromModalList", index);
  },
};

export default actions;
