import { INote } from "./store";

export interface IUserLoginData {
  username: string;
  password: string;
}

export interface IUserRegisterData {
  name: string;
  username: string;
  password: string;
}

export interface IBodyEditNameBoard {
  idBoard: string;
  newName: string;
}
export interface IBodyUpdateNote {
  idNote: string;
  updatedNote: INote;
}
