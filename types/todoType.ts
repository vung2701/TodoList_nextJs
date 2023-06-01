export enum CompletionStatus {
  TODO = "TODO",
  PROCESS = "PROCESS",
  DONE = "DONE",
}

type Todo = {
  id: number;
  name: string;
  status: CompletionStatus;
  deadline?: Date;
};

export default Todo;

