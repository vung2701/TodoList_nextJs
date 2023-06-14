export enum CompletionStatus {
  TODO = "TODO",
  PROCESS = "PROCESS",
  DONE = "DONE",
}

export enum Level {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

type Todo = {
  id: number;
  name?: string;
  status?: CompletionStatus;
  deadline?: Date;
  level?: Level;
  point?: number;
};

export default Todo;

export type initData = {
  todos: Todo[],
  pageInfor: {
    perPage: any;
    page: number,
    totalItems: number,
  }
}