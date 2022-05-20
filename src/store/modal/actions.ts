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

  setIdForModal(
    { commit }: ActionContext<IModalState, IModalState>,
    id: string
  ): void {
    commit("setIdForModal", id);
  },
};

export default actions;
