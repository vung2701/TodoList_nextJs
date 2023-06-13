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
  totalItems(totalItems: any): unknown;
  todos: Todo[],
  pageInfor: {
    currentPage: number,
    totalPage: number,
    totalItems: number
    pageSize: number,
  }
}