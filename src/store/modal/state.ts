import { IModalState } from "@/types/store";

const state = (): IModalState => ({
  isBoardEditModal: false,
  isUpdateNoteModal: false,
  idForModal: "",
});

export default state;
