export enum CompletionStatus {
  TODO = "TODO",
  PROCESS = "PROCESS",
  DONE = "DONE",
}

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

type Todo ={
  id: number;
  name?: string;
  status?: CompletionStatus;
  deadline?: Date;

};

export default Todo;

