export interface Checklist {
  isChecked: boolean;
  paragraph: string;
}

export interface Position {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
}

export interface Note {
  type: string;
  color: string;
  position?: Position;
  title?: string;
  paragraph?: string;
  list?: Array<string | Checklist>;
}

export interface Board {
  type: string;
  name: string;
  notes: Array<Note>;
}

export interface userContent {
  boards: Array<Board>;
}

export interface State {
  isLoggedIn: boolean;
  userId: string;
  userContent: userContent;
  token: string;
}
