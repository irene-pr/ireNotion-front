import { IModalState } from "@/types/store";

const state: IModalState = {
  isBoardEditModal: false,
  isUpdateNoteModal: false,
  isUpdateListNoteModal: false,
  isUpdateChecklistNoteModal: false,
  idForModal: "",
  listForModal: [],
  checklistForModal: [],
};

export default state;
