export interface IChecklist {
  isChecked: boolean;
  paragraph: string;
}

export interface IPosition {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
}

export interface Note {
  type: string;
  color: string;
  position?: IPosition;
  title?: string;
  paragraph?: string;
  list?: Array<string | IChecklist>;
}

export interface IBoard {
  type: string;
  name: string;
  notes: Array<Note>;
}

export interface IUserContent {
  name: string;
  boards: Array<IBoard>;
}

export interface IState {
  isLoggedIn: boolean;
  userId: string;
  userContent: IUserContent;
  token: string;
}

export interface IUserLoginData {
  username: string;
  password: string;
}
